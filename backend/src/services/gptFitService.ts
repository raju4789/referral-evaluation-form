import pool from '../db';
import { RefferalGPTFitRequest, RefferalGPTFitResponse } from '../types';
import logger from '../utils/logger';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set in your .env
  baseURL: process.env.OPENAI_API_BASE, // Set in .env or use default
});

export const processGptFit = async (
  data: RefferalGPTFitRequest
): Promise<RefferalGPTFitResponse> => {
  const { candidateEmail, candidateName, jobDescription, candidateProfile, candidateOwnEvaluation } = data;

  // Compose the messages array with strong typing
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'user',
      content: `Job Description:\n${jobDescription}\n\nCandidate Profile:\n${candidateProfile}\n\nWhy Candidate thinks they are a Great Fit:\n${candidateOwnEvaluation}\n\nCandidate Name:\n${candidateName}`,
    },
    {
      role: 'user',
      content: `Please evaluate the candidate's fit for the job description based on the provided profile and their own evaluation. Provide a detailed analysis of their strengths and weaknesses, and how they align with the job requirements. Your evaluation should be in a professional tone and should not include any personal opinions or biases. Please provide a summary of your evaluation.`,
    },
  ];

  try {
    // Call OpenAI Chat API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages,
      temperature: 0,
      top_p: 0,
    });

    const gptEvaluation = response.choices[0]?.message?.content?.trim() || 'No evaluation generated';

    // Format date for MySQL DATETIME
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Store in database
    await pool.query(
      'INSERT INTO referral_gpt_response (referral_email, referral_name, gpt_fit_answer, created_at) VALUES (?, ?, ?, ?)',
      [candidateEmail, candidateName, gptEvaluation, created_at]
    );

    return {
      candidateName,
      candidateEmail,
      gptEvaluation,
    };
  } catch (error: any) {
    logger.error('Error during OpenAI processing: ' + (error.message || JSON.stringify(error)));
    throw new Error('Failed to generate OpenAI evaluation');
  }
};
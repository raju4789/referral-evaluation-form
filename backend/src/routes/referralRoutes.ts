import express, { Request, Response } from 'express';
import { processGptFit } from '../services/gptFitService';
import { RefferalGPTFitRequest } from '../types';
import logger from '../utils/logger';

const router = express.Router();

router.post(
  '/gptFit',
  async (
    req: Request<{}, {}, RefferalGPTFitRequest>,
    res: Response
  ): Promise<void> => {
    try {
      const result = await processGptFit(req.body);

      if (!result) {
        logger.warn('GPT Fit service returned no result', { requestBody: req.body });
        res.status(400).json({ error: 'Unable to process GPT Fit request' });
        return;
      }

      logger.info('GPT Fit processed successfully', {
        candidateName: result.candidateName,
        candidateEmail: result.candidateEmail,
      });

      res.status(201).json(result);
    } catch (error) {
      logger.error('Error processing GPT Fit', {
        error: error instanceof Error ? error.message : error,
        requestBody: req.body,
      });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

export default router;

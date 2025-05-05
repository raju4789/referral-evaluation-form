import axios from 'axios';
import { ReferralGPTFitRequest, ReferralGPTFitResponse } from '../types';

// No baseURL needed; use relative paths so Vite proxy works
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postGptFit = async (
  data: ReferralGPTFitRequest
): Promise<ReferralGPTFitResponse> => {
  const response = await axiosInstance.post<ReferralGPTFitResponse>('/api/gptFit', data);
  return response.data;
};
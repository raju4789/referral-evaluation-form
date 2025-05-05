export interface ReferralGPTFitRequest {
    candidateName: string;
    candidateEmail: string;
    jobDescription: string;
    candidateProfile: string;
    candidateOwnEvaluation: string;
  }
  
  export interface ReferralGPTFitResponse {
    candidateName: string;
    candidateEmail: string;
    gptEvaluation: string;
  }
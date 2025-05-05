export interface RefferalGPTFitRequest {
    candidateName: string;
    candidateEmail: string;
    jobDescription: string;
    candidateProfile: string;
    candidateOwnEvaluation: string;
  }
  
  export interface RefferalGPTFitResponse {
    candidateName: string;
    candidateEmail: string;
    gptEvaluation: string;
  }
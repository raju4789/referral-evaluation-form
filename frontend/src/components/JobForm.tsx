import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import { postGptFit } from '../services/gptFitService';
import { ReferralGPTFitRequest, ReferralGPTFitResponse } from '../types';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const JobForm: React.FC = () => {
  const [form, setForm] = useState<ReferralGPTFitRequest>({
    jobDescription: '',
    candidateProfile: '',
    candidateOwnEvaluation: '',
    candidateName: '',
    candidateEmail: '',
  });

  const [result, setResult] = useState<ReferralGPTFitResponse | null>(null);
  const [error, setError] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const response = await postGptFit(form);
      setResult(response);
    } catch (err) {
      setError('Failed to get evaluation. Please try again.');
      console.error(err);
    }
  };

  const handleCopy = () => {
    if (result?.gptEvaluation) {
      navigator.clipboard.writeText(result.gptEvaluation);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f6fa',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 600,
          width: '100%',
          maxHeight: '80vh',      // Limit height to 80% of viewport
          overflow: 'auto',       // Enable scroll if content overflows
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            letterSpacing: 1,
            mb: 3,
            textShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          Candidate Evaluation Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Candidate Name"
            name="candidateName"
            value={form.candidateName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Candidate Email"
            name="candidateEmail"
            value={form.candidateEmail}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Job Description"
            name="jobDescription"
            value={form.jobDescription}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Candidate Profile"
            name="candidateProfile"
            value={form.candidateProfile}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Why do you think you are a great fit?"
            name="candidateOwnEvaluation"
            value={form.candidateOwnEvaluation}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: '100%' }}>
            Submit
          </Button>
        </Box>
        {result && (
          <Box mt={3}>
            <Box display="flex" alignItems="center" mb={1}>
              <Typography variant="h6" color="success.main" sx={{ flexGrow: 1 }}>
                Evaluation Result:
              </Typography>
              <Tooltip title="Copy to clipboard">
                <IconButton onClick={handleCopy} size="small" color="primary">
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {result.gptEvaluation}
            </Typography>
          </Box>
        )}
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default JobForm;
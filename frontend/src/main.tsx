import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import JobForm from './components/JobForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JobForm />
  </StrictMode>,
)

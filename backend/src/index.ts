import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import referralRoutes from './routes/referralRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.use('/api/', referralRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
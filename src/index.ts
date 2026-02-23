import express from 'express';
import cors from 'cors';
import worldRoutes from './routes/worlds';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/worlds', worldRoutes);

app.get('/health', (req, res) => {
  res.send('Server is healthy');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

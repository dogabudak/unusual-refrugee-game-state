import express from 'express';
import cors from 'cors';
import worldRoutes from './routes/worlds';
import playerRoutes from './routes/players';
import characterRoutes from './routes/characters';
import gameRoutes from './routes/games';
import hexTileRoutes from './routes/hex-tiles';
import interactableRoutes from './routes/interactables';
import mapItemRoutes from './routes/map-items';
import worldStateRoutes from './routes/world-states';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/worlds', worldRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/hex-tiles', hexTileRoutes);
app.use('/api/interactables', interactableRoutes);
app.use('/api/map-items', mapItemRoutes);
app.use('/api/world-states', worldStateRoutes);

app.get('/health', (req, res) => {
  res.send('Server is healthy');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

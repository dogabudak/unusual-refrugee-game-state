import { Router } from 'express';
import prisma from '../engine/db';

const router = Router();

router.get('/:worldId/state', async (req, res) => {
  const { worldId } = req.params;

  try {
    const worldState = await prisma.world.findUnique({
      where: { id: worldId },
      include: {
        players: true,
        units: true,
        buildings: true,
      },
    });

    if (!worldState) {
      return res.status(404).json({ error: 'World not found' });
    }

    res.json(worldState);
  } catch (error) {
    console.error('Failed to fetch world state:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

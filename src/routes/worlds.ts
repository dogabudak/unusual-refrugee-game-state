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

router.post('/:worldId/commands', async (req, res) => {
    const { worldId } = req.params;
    const { commands } = req.body;

    if (!commands || !Array.isArray(commands)) {
        return res.status(400).json({ error: 'Commands must be an array' });
    }

    console.log(`Received commands for world ${worldId}:`, commands);

    // In a real implementation, you would queue these commands
    // for processing by the game engine's tick.
    // e.g., await queue.add('process-commands', { worldId, commands });

    res.json({ message: 'Commands received' });
});

export default router;

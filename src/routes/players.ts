import { Router } from 'express';
import prisma from '../engine/db';

const router = Router();

// List players
router.get('/', async (req, res) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (error) {
    console.error('Failed to fetch players:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new player
router.post('/', async (req, res) => {
  const { worldId, name, resources } = req.body;

  if (!worldId || !name) {
    return res.status(400).json({ error: 'worldId and name are required' });
  }

  try {
    const newPlayer = await prisma.player.create({
      data: {
        worldId,
        name,
        resources: resources || {},
      },
    });
    res.status(201).json(newPlayer);
  } catch (error) {
    console.error('Failed to create player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get player details
router.get('/:playerId', async (req, res) => {
  const { playerId } = req.params;

  try {
    const player = await prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.json(player);
  } catch (error) {
    console.error('Failed to fetch player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update player info
router.put('/:playerId', async (req, res) => {
  const { playerId } = req.params;
  const { name, resources } = req.body;

  try {
    const updatedPlayer = await prisma.player.update({
      where: { id: playerId },
      data: {
        name,
        resources,
      },
    });
    res.json(updatedPlayer);
  } catch (error) {
    console.error('Failed to update player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a player
router.delete('/:playerId', async (req, res) => {
  const { playerId } = req.params;

  try {
    await prisma.player.delete({
      where: { id: playerId },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

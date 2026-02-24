import { Router } from 'express';
import prisma from '../engine/db';

const router = Router();

// List characters (units)
router.get('/', async (req, res) => {
  try {
    const units = await prisma.unit.findMany();
    res.json(units);
  } catch (error) {
    console.error('Failed to fetch units:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new character (unit)
router.post('/', async (req, res) => {
  const { worldId, playerId, type, position, hp, attack, defense, speed } = req.body;

  if (!worldId || !playerId || !type) {
    return res.status(400).json({ error: 'worldId, playerId, and type are required' });
  }

  try {
    const newUnit = await prisma.unit.create({
      data: {
        worldId,
        playerId,
        type,
        position: position || {},
        hp: hp || 100,
        attack: attack || 10,
        defense: defense || 5,
        speed: speed || 1,
      },
    });
    res.status(201).json(newUnit);
  } catch (error) {
    console.error('Failed to create unit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get character (unit) details
router.get('/:characterId', async (req, res) => {
  const { characterId } = req.params;

  try {
    const unit = await prisma.unit.findUnique({
      where: { id: characterId },
    });

    if (!unit) {
      return res.status(404).json({ error: 'Unit not found' });
    }

    res.json(unit);
  } catch (error) {
    console.error('Failed to fetch unit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a character (unit)
router.put('/:characterId', async (req, res) => {
  const { characterId } = req.params;
  const { type, position, hp, attack, defense, speed } = req.body;

  try {
    const updatedUnit = await prisma.unit.update({
      where: { id: characterId },
      data: {
        type,
        position,
        hp,
        attack,
        defense,
        speed,
      },
    });
    res.json(updatedUnit);
  } catch (error) {
    console.error('Failed to update unit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a character (unit)
router.delete('/:characterId', async (req, res) => {
  const { characterId } = req.params;

  try {
    await prisma.unit.delete({
      where: { id: characterId },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete unit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Move a character (unit)
router.post('/:characterId/move', async (req, res) => {
    const { characterId } = req.params;
    const { position } = req.body;

    if (!position) {
        return res.status(400).json({ error: 'position is required' });
    }

    try {
        const updatedUnit = await prisma.unit.update({
            where: { id: characterId },
            data: {
                position,
            },
        });
        res.json(updatedUnit);
    } catch (error) {
        console.error('Failed to move unit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Loot an item
router.post('/:characterId/loot', async (req, res) => {
    const { characterId } = req.params;
    const { itemId } = req.body;

    // Not implemented yet, as there is no Item or Inventory model
    console.log(`Character ${characterId} looted item ${itemId}`);
    res.json({ message: 'Loot action received' });
});

export default router;

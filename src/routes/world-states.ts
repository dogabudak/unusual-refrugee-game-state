
import { Router } from 'express';
import prisma from '../engine/db';

const router = Router();

// List world states
router.get('/', async (req, res) => {
    try {
        const worldStates = await prisma.worldState.findMany();
        res.json(worldStates);
    } catch (error) {
        console.error('Failed to fetch world states:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a world state
router.post('/', async (req, res) => {
    const { worldId, tick, state } = req.body;

    if (!worldId || tick === undefined || !state) {
        return res.status(400).json({ error: 'worldId, tick, and state are required' });
    }

    try {
        const newWorldState = await prisma.worldState.create({
            data: {
                worldId,
                tick,
                state,
            },
        });
        res.status(201).json(newWorldState);
    } catch (error) {
        console.error('Failed to create world state:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get world state details
router.get('/:worldStateId', async (req, res) => {
    const { worldStateId } = req.params;

    try {
        const worldState = await prisma.worldState.findUnique({
            where: { id: worldStateId },
        });

        if (!worldState) {
            return res.status(404).json({ error: 'World state not found' });
        }

        res.json(worldState);
    } catch (error) {
        console.error('Failed to fetch world state:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a world state
router.put('/:worldStateId', async (req, res) => {
    const { worldStateId } = req.params;
    const { tick, state } = req.body;

    try {
        const updatedWorldState = await prisma.worldState.update({
            where: { id: worldStateId },
            data: {
                tick,
                state,
            },
        });
        res.json(updatedWorldState);
    } catch (error) {
        console.error('Failed to update world state:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a world state
router.delete('/:worldStateId', async (req, res) => {
    const { worldStateId } = req.params;

    try {
        await prisma.worldState.delete({
            where: { id: worldStateId },
        });
        res.status(204).send();
    } catch (error) {
        console.error('Failed to delete world state:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;


import { Router } from 'express';
import prisma from '../engine/db';

const router = Router();

// List all games
router.get('/', async (req, res) => {
    try {
        const games = await prisma.world.findMany();
        res.json(games);
    } catch (error) {
        console.error('Failed to fetch games:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new game
router.post('/', async (req, res) => {
    const { name, tickRate } = req.body;

    if (!name || !tickRate) {
        return res.status(400).json({ error: 'name and tickRate are required' });
    }

    try {
        const newGame = await prisma.world.create({
            data: {
                name,
                tickRate,
            },
        });
        res.status(201).json(newGame);
    } catch (error) {
        console.error('Failed to create game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get game details
router.get('/:worldId', async (req, res) => {
    const { worldId } = req.params;

    try {
        const game = await prisma.world.findUnique({
            where: { id: worldId },
        });

        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        res.json(game);
    } catch (error) {
        console.error('Failed to fetch game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a game
router.put('/:worldId', async (req, res) => {
    const { worldId } = req.params;
    const { name, tickRate } = req.body;

    try {
        const updatedGame = await prisma.world.update({
            where: { id: worldId },
            data: {
                name,
                tickRate,
            },
        });
        res.json(updatedGame);
    } catch (error) {
        console.error('Failed to update game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a game
router.delete('/:worldId', async (req, res) => {
    const { worldId } = req.params;

    try {
        await prisma.world.delete({
            where: { id: worldId },
        });
        res.status(204).send();
    } catch (error) {
        console.error('Failed to delete game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;

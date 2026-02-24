
import { Router } from 'express';
import prisma from '../engine/db';

const router = Router();

// List hex tiles
router.get('/', async (req, res) => {
    try {
        const hexTiles = await prisma.hexTile.findMany();
        res.json(hexTiles);
    } catch (error) {
        console.error('Failed to fetch hex tiles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a hex tile
router.post('/', async (req, res) => {
    const { worldId, q, r, terrainType, elevation, isPassable } = req.body;

    if (!worldId || q === undefined || r === undefined) {
        return res.status(400).json({ error: 'worldId, q, and r are required' });
    }

    try {
        const newHexTile = await prisma.hexTile.create({
            data: {
                worldId,
                q,
                r,
                terrainType,
                elevation,
                isPassable,
            },
        });
        res.status(201).json(newHexTile);
    } catch (error) {
        console.error('Failed to create hex tile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get hex tile details
router.get('/:hexTileId', async (req, res) => {
    const { hexTileId } = req.params;

    try {
        const hexTile = await prisma.hexTile.findUnique({
            where: { id: hexTileId },
        });

        if (!hexTile) {
            return res.status(404).json({ error: 'Hex tile not found' });
        }

        res.json(hexTile);
    } catch (error) {
        console.error('Failed to fetch hex tile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a hex tile
router.put('/:hexTileId', async (req, res) => {
    const { hexTileId } = req.params;
    const { terrainType, elevation, isPassable } = req.body;

    try {
        const updatedHexTile = await prisma.hexTile.update({
            where: { id: hexTileId },
            data: {
                terrainType,
                elevation,
                isPassable,
            },
        });
        res.json(updatedHexTile);
    } catch (error) {
        console.error('Failed to update hex tile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a hex tile
router.delete('/:hexTileId', async (req, res) => {
    const { hexTileId } = req.params;

    try {
        await prisma.hexTile.delete({
            where: { id: hexTileId },
        });
        res.status(204).send();
    } catch (error) {
        console.error('Failed to delete hex tile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;

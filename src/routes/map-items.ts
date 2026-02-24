
import { Router } from 'express';
import prisma from '../engine/db';

const router = Router();

// List map items
router.get('/', async (req, res) => {
    try {
        const mapItems = await prisma.mapItem.findMany();
        res.json(mapItems);
    } catch (error) {
        console.error('Failed to fetch map items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a map item
router.post('/', async (req, res) => {
    const { worldId, type, position, data } = req.body;

    if (!worldId || !type || !position) {
        return res.status(400).json({ error: 'worldId, type, and position are required' });
    }

    try {
        const newMapItem = await prisma.mapItem.create({
            data: {
                worldId,
                type,
                position,
                data,
            },
        });
        res.status(201).json(newMapItem);
    } catch (error) {
        console.error('Failed to create map item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get map item details
router.get('/:mapItemId', async (req, res) => {
    const { mapItemId } = req.params;

    try {
        const mapItem = await prisma.mapItem.findUnique({
            where: { id: mapItemId },
        });

        if (!mapItem) {
            return res.status(404).json({ error: 'Map item not found' });
        }

        res.json(mapItem);
    } catch (error) {
        console.error('Failed to fetch map item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a map item
router.put('/:mapItemId', async (req, res) => {
    const { mapItemId } = req.params;
    const { type, position, data } = req.body;

    try {
        const updatedMapItem = await prisma.mapItem.update({
            where: { id: mapItemId },
            data: {
                type,
                position,
                data,
            },
        });
        res.json(updatedMapItem);
    } catch (error) {
        console.error('Failed to update map item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a map item
router.delete('/:mapItemId', async (req, res) => {
    const { mapItemId } = req.params;

    try {
        await prisma.mapItem.delete({
            where: { id: mapItemId },
        });
        res.status(204).send();
    } catch (error) {
        console.error('Failed to delete map item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;

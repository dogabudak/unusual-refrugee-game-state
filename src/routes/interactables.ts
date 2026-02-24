
import { Router } from 'express';
import prisma from '../engine/db';

const router = Router();

// List interactables
router.get('/', async (req, res) => {
    try {
        const interactables = await prisma.interactable.findMany();
        res.json(interactables);
    } catch (error) {
        console.error('Failed to fetch interactables:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create an interactable
router.post('/', async (req, res) => {
    const { worldId, type, position, data } = req.body;

    if (!worldId || !type || !position) {
        return res.status(400).json({ error: 'worldId, type, and position are required' });
    }

    try {
        const newInteractable = await prisma.interactable.create({
            data: {
                worldId,
                type,
                position,
                data,
            },
        });
        res.status(201).json(newInteractable);
    } catch (error) {
        console.error('Failed to create interactable:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get interactable details
router.get('/:interactableId', async (req, res) => {
    const { interactableId } = req.params;

    try {
        const interactable = await prisma.interactable.findUnique({
            where: { id: interactableId },
        });

        if (!interactable) {
            return res.status(404).json({ error: 'Interactable not found' });
        }

        res.json(interactable);
    } catch (error) {
        console.error('Failed to fetch interactable:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update an interactable
router.put('/:interactableId', async (req, res) => {
    const { interactableId } = req.params;
    const { type, position, data } = req.body;

    try {
        const updatedInteractable = await prisma.interactable.update({
            where: { id: interactableId },
            data: {
                type,
                position,
                data,
            },
        });
        res.json(updatedInteractable);
    } catch (error) {
        console.error('Failed to update interactable:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete an interactable
router.delete('/:interactableId', async (req, res) => {
    const { interactableId } = req.params;

    try {
        await prisma.interactable.delete({
            where: { id: interactableId },
        });
        res.status(204).send();
    } catch (error) {
        console.error('Failed to delete interactable:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;

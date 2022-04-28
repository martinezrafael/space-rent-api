const { Router } = require('express');

const Event = require('../models/Event.model');
const router = Router();

//cria o evento atrelado ao espaço

router.post('/:spaceId', async (req, res) => {
    const { spaceId } = req.params;
    const { id: userId } = req.user;
    try {
        const event = await Event.create({ ...req.body, userId, spaceId });
        res.status(200).json(event);
    } catch (error) {
        res.status(500)._construct({message: "Error creating event", error})
    }
})

router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({message: "Error finding events", error})
    }
})

router.get('/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({message: "Error finding event", error})
    }
})

router.put('/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
        const updateEvent = await Event.findByIdAndUpdate(eventId, req.body, {new: true});
        res.status(200).json(updateEvent);
    } catch (error) {
        res.status(500).json({message: "Error updating event", error})
    }
})

router.delete('/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
        await Event.findByIdAndDelete(eventId);
        res.status(204).json()
    } catch (error) {
        res.status(500).json({message: "Error deleting event", error})
    }
})

module.exports = router;
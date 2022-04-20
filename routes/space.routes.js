const { Router } = require('express');
const router = Router();

const Space = require('../models/Space.model');
const Comment = require('../models/Comment.model')

router.post('/', async (req, res) => {
    const { id } = req.user;
    try {
        const space = await Space.create({ ...req.body, userId: id });
        res.status(200).json(space);
    } catch (error) {
        res.status(500).json({message: "Error creating space", error: error})
    }
})

router.get('/', async(req, res) => {
    try {
        const spaces = await Space.find();
        res.status(200).json(spaces);
    } catch (error) {
        res.status(500).json({message: "Error finding spaces", error: error});
    }
})

router.get('/:spaceId', async (req, res) => {
    const { spaceId } = req.params;
    try {
        const space = await Space.find(spaceId)
        res.status(200).json(space)
    } catch (error) {
        res.status(500).json({message: "Error finding space", error: error});
    }
})

router.put('/:spaceId', async (req, res) => {
    const { spaceId } = req.params;
    try {
        const updatedSpace = await Space.findByIdAndUpdate(spaceId, req.body, {new: true});
        res.status(200).json(updatedSpace);
    } catch (error) {
        res.status(500).json({message: "Error updating space", error: error});
    }
})

router.delete('/:spaceId', async(req, res) => {
    const { spaceId } = req.params;
    try {
        await Space.findByIdAndDelete(spaceId)
        await Comment.deleteMany({spaceId})
        res.status(204).json()
    } catch (error) {
        res.status(500).json({message: "Error deleting space", error: error});
    }
})

module.exports = router;
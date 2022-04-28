const { Router } = require("express");
const router = Router();

const uploadCloud = require("../configs/cloudinary.config");

const User = require("../models/User.model");

router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Error finding users", error: error});
    }
})

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).select(
            "username biography spaces"
        )
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put('/:userId', async(req, res) => {
    const { userId } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true});
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: "Error updating user", error: error})
    }
})

router.put("/image", uploadCloud.single('image'), async (req, res) => {
    const userId = req.user.id;
    const { path } = req.file;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: path },
            { new: true }
        ).select('-passwordHash')
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
const { Router } = require("express");
const router = Router();

const uploadCloud = require("../configs/cloudinary.config");

const User = require("../models/User.model");

router.get("/", async (req, res) => {
    try {
        const users = User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Error finding users", error: error});
    }
})

router.get("/", async (req, res) => {
    try {
        const userId = req.user.id;
        const userFromDb = await User.findById(userId).select(
            "username image biography"
        );
        res.status(200).json(userFromDb);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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
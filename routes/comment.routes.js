const { Router } = require('express');

const Comment = require('../models/Comment.model');
const Space = require('../models/Space.model');

const router = Router();

router.post('/:spaceId', async (req, res) => {
    const { spaceId } = req.params;
    const { id } = req.user;
    try {
        const space = await Space.findById(spaceId);
        if(space.userId == id){
            res.status(400).json({message: "User can't create a review on own space"})
            return;
        }

        const newComment = {  ...req.body, spaceId, userId: id }
        const commentFromdb = await Comment.create(newComment)

        await Space.findByIdAndUpdate(spaceId, {
            $push: {comments: commentFromdb._id}
        })

        res.status(200).json(commentFromdb);

    } catch (error) {
        res.status(500).json({message:"Error while trying to create new comment"}, error)
    }
})

router.get('/:spaceId', async(req, res) => {
    const { spaceId } = req.params;
    try {
        const comments = await Comment.find({spaceId}).populate(
            "userId",
            "username"
        )
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message:"Error while trying to get comments"}, error)
    }
})

router.delete('/:commentId', async (req, res) => {
    const { commentId } = req.params;
    const { id } = req.user;
    try {
        const comment = await Comment.findById(commentId)
        if(comment.userId != id){
            res.status(400).json("User can only delete own comment")
            return;
        }

        await Comment.findByIdAndDelete(commentId)

        await Space.findByIdAndUpdate(comment.spaceId, {
            $pull: {comments: commentId}
        })

        res.status(200).json({message: "Review Deleted"})
    } catch (error) {
        res.status(500).json({message:"Error while trying to delete comment"}, error)
    }
})

router.put('/:commentId', async(req, res) => {
    const { commentId } = req.params;
    const { id } = req.user;
    try {
        const updatedComment = await Comment.findOneAndUpdate({_id: commentId, userId: id}, req.body, {new: true})
        res.status(200).json(updatedComment);
    } catch (error) {
        s.status(500).json({message:"Error while trying to update comment"}, error)
    }
})

module.exports = router;
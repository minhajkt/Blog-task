import express from 'express'
import { Comment } from '../models/comment.js'

const router =  express.Router()

router.post('/:postId', async(req, res) => {
    try {
        const {postId} = req.params
        if(!postId) {
            return res.status(404).json({message : "PostId required to add comments"})
        }

        const {content, commenter} = req.body
        const post = await Comment.find({post : postId})
        if(!post) {
            return res.status(404).json({message : "Post with provided PostId not found"})
        }
        const comment  = await Comment.create({postId, content, commenter})
        return res.status(200).json({message : "Comment added successfully", comment})
    } catch (error) {
        console.log('err', error.message)
      return res.status(500).json({ message: "Internal server error" });
    }
})



export default router;
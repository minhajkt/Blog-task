import express from 'express'
import connectDB from './config/db.js'
import { Post } from './models/post.js'
import PostRoutes from './routes/postRoutes.js'
import CommentRoutes from "./routes/commentRoutes.js";

const app = express()

const port = process.env.PORT || 3000

connectDB()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/post', PostRoutes)
app.use("/comment", CommentRoutes);


app.listen(port, () => console.log(`Listening to port ${port}`))

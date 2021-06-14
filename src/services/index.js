import express from "express"
import CommentRouter from "./comment/index.js"
import ExperienceRouter from "./experience/index.js"
import PostRouter from "./post/index.js"
import ProfileRouter from "./profile/index.js"
import LikeRouter from "./like/index.js"

const route = express.Router()

route.use("/comments", CommentRouter)
route.use('/experience', ExperienceRouter)
route.use('/profile', ProfileRouter)
route.use('/posts', PostRouter)
route.use('/like', LikeRouter)

export default route

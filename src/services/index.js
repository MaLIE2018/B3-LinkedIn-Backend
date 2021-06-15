import express from "express"
import CommentRouter from "./comment/index.js"
import ExperienceRouter from "./experience/index.js"
import PostRouter from "./post/index.js"
import ProfileRouter from "./profile/index.js"
import LikeRouter from "./like/index.js"
import FileRouter from "../utils/fileUpload.js"

const route = express.Router()

route.use("/comments", CommentRouter)
route.use('/experience', ExperienceRouter, FileRouter)
route.use('/profile', ProfileRouter, FileRouter)
route.use('/post', PostRouter, FileRouter)
route.use('/like', LikeRouter)

export default route

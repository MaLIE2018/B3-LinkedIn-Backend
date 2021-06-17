import express from "express"
import { v2 } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"
import models from "../utils/db/index.js"
import createError from "http-errors"
import Parser from "json2csv"
import { pipeline, Readable } from "stream"

const fr = express.Router()

const {Profile, Experience, Post} = models

// Upload profile picture

const cloudinaryStorage = new CloudinaryStorage({
  v2,
  params: {
    folder: "linkedInProfilePictures",
    resource_type: "auto"
  }
})

const uploadProfileImage = multer({
  storage: cloudinaryStorage,

}).single("profileImage")

fr.post("/:profileId/uploadProfileImage", uploadProfileImage, async (req, res, next) => {
  try {
    const profile = await Profile.findByPk(req.params.profileId)

    const data = await Profile.update({ ...profile, image: req.file.path }, {
      where: { id: req.params.profileId },
      returning: true
    })

    data[0] === 1 ? res.status(200).send(data[1][0]) : next(createError(404, { message: "Profile not found, check ID!" }))

  } catch (error) {
    next(error)
  }
})

// Upload experience picture

const uploadExperienceImage = multer({
  storage: cloudinaryStorage,

}).single("experienceImage")

fr.post("/:expId/uploadExperienceImage", uploadExperienceImage, async (req, res, next) => {
  try {
    const exp = await Experience.findByPk(req.params.expId)
    console.log("experience" + exp)
    const data = await Experience.update({ ...exp, image: req.file.path }, {
      where: { id: req.params.expId },
      returning: true
    })

    data[0] === 1 ? res.status(200).send(data[1][0]) : next(createError(404, { message: "Experience not found, check ID!" }))

  } catch (error) {
    next(error)
  }
})


// Upload post picture


const uploadPostImage = multer({
  storage: cloudinaryStorage,

}).single("postImage")

fr.post("/:postId/uploadPostImage", uploadPostImage, async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.postId)
    console.log("Post" + post)
    const data = await Post.update({ ...post, image: req.file.path }, {
      where: { id: req.params.postId },
      returning: true
    })

    data[0] === 1 ? res.status(200).send(data[1][0]) : next(createError(404, { message: "Experience not found, check ID!" }))

  } catch (error) {
    next(error)
    console.log(console.log(error))
  }
})


// Export experiences as CSV

fr.get("/:profileId/exportCSV", async (req, res, next) => {
  try {
    const userExperiences = await Experience.findAll({
      where: { profileId: req.params.profileId },
    })

    const fields = ["id", "role", "company", "startDate", "endDate", "description", "area"]

    const parser = new Parser({ fields })
    const csv = parser.parse(userExperiences)
    const source = Readable.from(csv)

    res.setHeader("Content-Disposition", `attachment; filename=experiences.csv`)

    pipeline(source, res, (error) => {
      if (error) next(error)
    })
  } catch (error) {
    next(error)
  }

})

export default fr
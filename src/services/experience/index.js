import express from "express";
import createError from "http-errors";
import models from "../../utils/db/index.js"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"

const er = express.Router()

const Experience = models.Experience

er.get("/:userId/user", async (req, res, next) => {
  try {
    const userExperiences = await Experience.findAll({
      where: { profileId: req.params.userId },
    })

    userExperiences ? res.send(userExperiences) : next(createError(404, "No experiences!"))
  } catch (error) {
    console.log(error)
  }
})
er.get("/:expId", async (req, res, next) => {
  try {
    const experience = await Experience.findByPk(req.params.expId)

    experience ? res.send(experience) : next(createError(404, "Experience not found, check ID!"))
  } catch (error) {
    console.log(error)
  }
})
er.post("/:userId", async (req, res, next) => {
  try {
    const newExperience = await Experience.create({ ...req.body, profileId: req.params.userId })

    newExperience ? res.send(newExperience) : next(createError(400, "Error creating experience, trying again!"))
  } catch (error) {
    console.log(error)
  }
})
er.put("/:expId", async (req, res, next) => {
  try {
    const experience = await Experience.findByPk(req.params.expId)
    const updatedExperience = await Experience.update({ ...req.body, profileId: experience.profileId }, {
      where: { id: req.params.expId },
      returning: true
    })

    updatedExperience ? res.send(updatedExperience[1][0]) : next(createError(500, "Error updating experience!"))
  } catch (error) {
    console.log(error)
  }
})
er.delete("/:expId", async (req, res, next) => {
  try {
    const deleted = await Experience.destroy({
      where: { id: req.params.expId }
    })
    console.log(deleted)
    deleted === 1 ? res.send("Successfully deleted") : next(createError(404, "Error deleting "))
  } catch (error) {
    console.log(error)
  }
})

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "experienceImages",
    resource_type: "auto"
  }
})

const upload = multer({
  storage: cloudinaryStorage,

}).single("experienceImage")

er.post("/:expId/uploadImage", upload, async (req, res, next) => {
  try {
    const exp = await Experience.findByPk(req.params.expId)
    const data = await Experience.update({ ...exp ,image: req.file.path }, {
      where: { id: req.params.expId },
      returning: true
    })

    data[0] === 1 ? res.status(200).send(data[1][0]) : res.send("error uploading image")

  } catch (error) {
    next(error)
  }
})

export default er
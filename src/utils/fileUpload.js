import express from "express"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"
import models from "../utils/db/index.js"
import createError from "http-errors"

const fr = express.Router()

const Experience = models.Experience
const Profile = models.Profile

// Upload profile picture

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "linkedInProfilePictures",
      resource_type: "auto"
    }
  })
  
  const uploadProfileImage = multer({
    storage: cloudinaryStorage,
  
  }).single("profileImage")
  
  fr.post("/:profileId/uploadImage", uploadProfileImage, async (req, res, next) => {
    try {
      const profile = await Profile.findByPk(req.params.profileId)
     
      const data = await Profile.update({ ...profile, image: req.file.path }, {
        where: { id: req.params.profileId },
        returning: true
      })
  
      data[0] === 1 ? res.status(200).send(data[1][0]) : next(createError(404, {message: "Profile not found, check ID!"}))
  
    } catch (error) {
      next(error)
    }
  })

// Upload experience picture

  const uploadExperienceImage = multer({
    storage: cloudinaryStorage,
  
  }).single("experienceImage")
  
  fr.post("/:expId/uploadImage", uploadExperienceImage, async (req, res, next) => {
    try {
      const exp = await Experience.findByPk(req.params.expId)
      console.log("experience" + exp)
      const data = await Experience.update({ ...exp ,image: req.file.path }, {
        where: { id: req.params.expId },
        returning: true
      })
  
      data[0] === 1 ? res.status(200).send(data[1][0]) : next(createError(404, {message: "Experience not found, check ID!"}))
  
    } catch (error) {
      next(error)
    }
  })


export default fr
import express from "express";
import createError from "http-errors";
import models from "../../utils/db/index.js"

const er = express.Router()

const Experience = models.Experience

er.get("/:userId/user", async (req, res, next) => {
  try {
    
    const userExperiences = await Experience.findAll({
      where: { profileId: req.params.userId },
    })

    userExperiences ? res.send(userExperiences) : next(createError(404, {message: "No experiences!"}))
  } catch (error) {
    console.log(error)
  }
})
er.get("/:expId", async (req, res, next) => {
  try {
    const experience = await Experience.findByPk(req.params.expId)

    experience ? res.send(experience) : next(createError(404, {message: "Experience not found, check ID!"}))
  } catch (error) {
    console.log(error)
  }
})
er.post("/:userId", async (req, res, next) => {
  try {
    const newExperience = await Experience.create({ ...req.body, profileId: req.params.userId })

    newExperience ? res.send(newExperience) : next(createError(400, {message: "Error creating experience, trying again!"}))
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

    updatedExperience ? res.send(updatedExperience[1][0]) : next(createError(500, {message: "Error updating experience!"}))
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
    deleted === 1 ? res.send("Successfully deleted") : next(createError(404, {message: "Experience not found, check ID! "}))
  } catch (error) {
    console.log(error)
  }
})


export default er
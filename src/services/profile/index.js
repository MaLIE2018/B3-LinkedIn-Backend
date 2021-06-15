import express from "express";
import createError from "http-errors";
import models from "../../utils/db/index.js"

const pr = express.Router()

const Profile = models.Profile
const Experience = models.Experience

pr.get("/", async (req, res, next) => {
  try {
    const profiles = await Profile.findAll({
      include: [{model: Experience}]
    })
    profiles.length > 0 ? res.send(profiles) : next(createError(500, {message: "No profiles to show"}))
  } catch (error) {
    console.log(error)
  }
})
pr.get("/:id", async (req, res, next) => {
  try {
    const profile = await Profile.findByPk(req.params.id)
    profile ? res.send(profile) : next(createError(404, {message: "Profile not found, check your ID!"}))
  } catch (error) {
    console.log(error)
  }
})
pr.post("/", async (req, res, next) => {
  try {
    const profile = await Profile.create(req.body)

    profile ? res.send(profile) : next(createError(400, {message: "Error creating profile, try again!"} ))

  } catch (error) {
    console.log(error)
  }
})
pr.put("/:id", async (req, res, next) => {
  try {
    const updatedProfile = await Profile.update(req.body, {
      where: {id: req.params.id},
      returning: true,
    })

    updatedProfile ? res.send(updatedProfile[1][0]) : next(createError(400, {message: "Error updating profile, try again!"}))
  } catch (error) {
    console.log(error)
  }
})
pr.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Profile.destroy({
      where: {id: req.params.id}
    })
    console.log(deleted)
    deleted === 1 ? res.send("Profile deleted") : next(createError(500, {message: "Error deleteing profile, try again!"} ))
  } catch (error) {
    console.log(error)
  }
})


export default pr
import express from "express";
import createError from "http-errors";
import models from "../../utils/db/index.js"

const pr = express.Router()

const Profile = models.Profile

pr.get("/", async (req, res, next) => {
  try {
    const profiles = await Profile.findAll()
    profiles.length > 0 ? res.send(profiles) : next(createError(500, "No profiles to show"))
  } catch (error) {
    console.log(error)
  }
})
pr.get("/:id", async (req, res, next) => {
  try {
    const profile = await Profile.findByPk(req.params.id)
    profile ? res.send(profile) : next(createError(404, "Profile not found, check your ID!"))
  } catch (error) {
    console.log(error)
  }
})
pr.post("/", async (req, res, next) => {
  try {
    const profile = await Profile.create(req.body)

    profile ? res.send(profile) : next(createError(400, "Error creating profile, try again!" ))

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

    updatedProfile ? res.send(updatedProfile) : next(createError(400, "Error updating profile, try again!"))
  } catch (error) {
    console.log(error)
  }
})
pr.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Profile.destroy({
      where: {id: req.params.id}
    })

    deleted ? res.send(deleted) : next(createError(500, "Error deleting profile, try again!" ))
  } catch (error) {
    console.log(error)
  }
})


export default pr
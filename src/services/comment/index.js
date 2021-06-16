import express from "express";
import createError from "http-errors";
import models from "../../utils/db/index.js"

const Comments = models.Comment
const Profiles = models.Profile
const cr = express.Router()


cr.get("/:postId/post", async (req,res, next) =>{
  try {
    try {
      const comments = await Comments.findAll({
        where: {postId: req.params.postId},
        include: [
          {model: Profiles , attributes: ["name", "surname", "title", 'image']}
        ]})
      comments? res.status(200).send(comments) : next(createError(404, {message: "No Comments found"}))
    } catch (error) {
      console.log(error)
      next(createError(500, {message: "Generic Server Error"}))
    }
  } catch (error) {
    console.log(error)
  }
})
cr.get("/:id", async (req,res, next) =>{
  try {
    try {
      const comment = await Comments.findByPk(req.params.id)
      comment? res.status(200).send(comment) : next(createError(404, {message: "Comment found"}))
    } catch (error) {
      console.log(error)
      next(createError(500, {message: "Generic Server Error"}))
    }
  } catch (error) {
    console.log(error)
  }
})
cr.post("/", async (req,res, next) =>{
  try {
    const profile = await Profiles.findByPk(req.body.profileId)
    profile ?? next(createError(404, {message: "Profile not found"}))
    const newComment = await Comments.create(req.body)
    res.status(201).send(newComment)
  } catch (error) {
    error.name === "SequelizeValidationError"?
    next(createError(400, {message: error.errors.map(e => e.message)}))
    :next(createError(500, {message: "Generic Server Error"}))
    console.log(error.errors)
  }
})
cr.put("/:id", async (req,res, next) =>{
  try {
    const comment = await Comments.findByPk(req.params.id)
    comment ?? next(createError(404, {message: "Comment not found"}))
    const newComment = await Comments.update({...req.body, profileId: comment.profileId, postId: comment.postId}, {where: {id: req.params.id}, returning: true})
    res.status(201).send(newComment[1])
  } catch (error) {
    error.name === "SequelizeValidationError"?
    next(createError(400, {message: error.errors.map(e => e.message)}))
    :next(createError(500, {message: "Generic Server Error"}))
    console.log(error.errors)
  }
})
cr.delete("/:id", async (req,res, next) =>{
  try {
    const comment = await Comments.destroy({where: {id: req.params.id}})
    comment? res.status(204).send() : next(createError(404, {message: "Comment found"}))
  } catch (error) {
    console.log(error)
    next(createError(500, {message: "Generic Server Error"}))
  }
})


export default cr
import express from "express";
import createError from "http-errors";
import models from "../../utils/db/index.js"

const Posts = models.Post
const Profiles = models.Profile
const per = express.Router()

per.get("/", async (req,res, next) =>{
  try {
    const posts = await Posts.findAll({
      include: [
        {model: Profiles , attributes: ["name", "surname", "title", 'image','id']}
      ]})
    posts? res.status(200).send(posts) : next(createError(404, {message: "No Posts found"}))
  } catch (error) {
    console.log(error)
    next(createError(500, {message: "Generic Server Error"}))
  }
})
per.get("/:id", async (req,res, next) =>{
  try {
    const post = await Posts.findByPk(req.params.id)
    post? res.status(200).send(post) : next(createError(404, {message: "Post found"}))
  } catch (error) {
    console.log(error)
    next(createError(500, {message: "Generic Server Error"}))
  }
})
per.post("/", async (req,res, next) =>{
  try {
    const profile = await Profiles.findByPk(req.body.profileId)
    profile ?? next(createError(404, {message: "Profile not found"}))
    const newPost = await Posts.create(req.body)
    res.status(201).send(newPost)
  } catch (error) {
    error.name === "SequelizeValidationError"?
    next(createError(400, {message: error.errors.map(e => e.message)}))
    :next(createError(500, {message: "Generic Server Error"}))
    console.log(error)
  }
})
per.put("/:id", async (req,res, next) =>{
  try {
    const post = await Posts.findByPk(req.params.id)
    post ?? next(createError(404, {message: "Post not found"}))
    const newPost = await Posts.update({...req.body, profileId: post.profileId}, {where: {id: req.params.id}, returning: true})
    console.log('newPost:', newPost[1])
    res.status(201).send(newPost[1])
  } catch (error) {
    error.name === "SequelizeValidationError"?
    next(createError(400, {message: error.errors.map(e => e.message)}))
    :next(createError(500, {message: "Generic Server Error"}))
    console.log(error.errors)
  }
})
per.delete("/:id", async (req,res, next) =>{
  try {
    const post = await Posts.destroy({where: {id: req.params.id}})
    post? res.status(204).send() : next(createError(404, {message: "Post found"}))
  } catch (error) {
    console.log(error)
    next(createError(500, {message: "Generic Server Error"}))
  }
})

export default per
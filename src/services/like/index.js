import express from "express";
import createError from "http-errors";
import models from "../../utils/db/index.js"

const Posts = models.Post
const Comments = models.Comment
const PostLikes = models.PostLike
const CommentLikes = models.CommentLike
const Profiles = models.Profile
const Op = models.op

const lr = express.Router()


lr.get("/comment/:id", async (req,res, next) =>{
  try {
    const comment = await Comments.findByPk(req.params.id)
    comment ?? next(createError(404, {message: "Comment not found"}))
    const likes = await CommentLikes.count({where: {commentId: req.params.id}})
    res.status(200).send({likes: likes})
  } catch (error) {
    console.log(error)
  }
})
lr.get("/post/:id/users", async (req,res, next) =>{
  try {
    const post = await Posts.findByPk(req.params.id)
    post ?? next(createError(404, {message: "Post not found"}))
    const users = await PostLikes.findAll({where: {postId: req.params.id}, include: [
      {model: Profiles , attributes: ["name", "surname"]}
    ], attributes: {exclude:["id", "createdAt", "updatedAt", "profileId", "postId"]}})
    res.status(200).send({users: users})
  } catch (error) {
    console.log(error)
  }
})
lr.get("/post/:id", async (req,res, next) =>{
  try {
    const post = await Posts.findByPk(req.params.id)
    post ?? next(createError(404, {message: "Post not found"}))
    
    const likes = await PostLikes.count({where: {postId: req.params.id}})
    res.status(200).send({likes: likes})
  } catch (error) {
    console.log(error)
  }
})
lr.post("/comment/:id", async (req,res, next) =>{
  try {
    const comment = await Comments.findByPk(req.params.id)
    comment ?? next(createError(404, {message: "Comment not found"}))
    const profile = await Profiles.findByPk(req.body.profileId)
    profile ?? next(createError(404, {message: "Profile not found"}))
    const like = await CommentLikes.findOne({where: {[Op.and]:[{commentId: req.params.id}, {profileId:req.body.profileId}]}})
    like !== null?await CommentLikes.destroy({where: {[Op.and]:[{commentId: req.params.id}, {profileId:req.body.profileId}]}}):await CommentLikes.create({...req.body,commentId:req.params.id})
    res.status(200).send()
  } catch (error) {
    error.name === "SequelizeValidationError"?
    next(createError(400, {message: error.errors.map(e => e.message)}))
    :next(createError(500, {message: "Generic Server Error"}))
    console.log(error)
  }
})
lr.post("/post/:id", async (req,res, next) =>{
  try {
    const post = await Posts.findByPk(req.params.id)
    post ?? next(createError(404, {message: "Comment not found"}))
    const profile = await Profiles.findByPk(req.body.profileId)
    profile ?? next(createError(404, {message: "Profile not found"}))
    const like = await PostLikes.findOne({where: {[Op.and]:[{postId: req.params.id}, {profileId:req.body.profileId}]}})
    like !== null?await PostLikes.destroy({where: {[Op.and]:[{postId: req.params.id}, {profileId:req.body.profileId}]}}):await PostLikes.create({...req.body,postId:req.params.id})
    res.status(200).send()
  } catch (error) {
    error.name === "SequelizeValidationError"?
    next(createError(400, {message: error.errors.map(e => e.message)}))
    :next(createError(500, {message: "Generic Server Error"}))
    console.log(error)
  }
})

export default lr
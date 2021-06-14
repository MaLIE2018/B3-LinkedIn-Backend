import express from "express";
import createError from "http-errors";
import models from "../../utils/db/index.js"

const er = express.Router()

const Experience = models.Experience

er.get("/:userName", async (req,res, next) =>{
  try {
    const userExperiences = await Experience.findAll({
      where: {userId: req.params.userName},
    })
    
    userExperiences ? res.send()
  } catch (error) {
    console.log(error)
  }
})
er.get("/:id", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
er.post("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
er.put("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
er.delete("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})

export default er
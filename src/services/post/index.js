import express from "express";
import createError from "http-errors";
import models from "../../utils/db/index.js"

const Posts = models.Post
const per = express.Router()

per.get("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
per.get("/:id", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
per.post("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
per.put("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
per.delete("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})

export default per
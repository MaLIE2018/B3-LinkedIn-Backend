import express from "express";
import createError from "http-errors";

const pr = express.Router()


pr.get("/", async (req,res, next) =>{
  try {
    res.status(200).send("Hallo")
  } catch (error) {
    console.log(error)
  }
})
pr.get("/:id", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
pr.post("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
pr.put("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
pr.delete("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})

export default pr
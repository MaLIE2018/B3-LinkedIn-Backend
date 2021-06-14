import express from "express";
import createError from "http-errors";

const er = express.Router()


er.get("/", async (req,res, next) =>{
  try {
    
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
import express from "express";
import createError from "http-errors";

const cr = express.Router()


cr.get("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
cr.get("/:id", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
cr.post("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
cr.put("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
cr.delete("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})


export default cr
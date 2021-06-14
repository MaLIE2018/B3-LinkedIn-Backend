import express from "express";
import createError from "http-errors";

const lr = express.Router()


lr.get("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
lr.get("/:id", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
lr.post("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
lr.put("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})
lr.delete("/", async (req,res, next) =>{
  try {
    
  } catch (error) {
    console.log(error)
  }
})

export default lr
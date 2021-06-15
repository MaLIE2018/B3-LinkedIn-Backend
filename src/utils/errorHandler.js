const badRequest = (err,req,res, next) => {
  try {
    if(err.status === 400){
      res.status(400).send( err.message)
    }else{
      next()
    }
    if(err === "ValidationError"){
      res.status(400).send(err)
    }
  } catch (error) {
    console.log(error)
  }
}
const forbidden = (err,req,res, next) => {
  try {
    if(err.status === 403){
      res.status(403).send( err.message)
    }else{
      next()
    }
  } catch (error) {
    console.log(error)
  }
}
const notFound = (err,req,res, next) => {
  try {
    if(err.status === 404){
      res.status(404).send( err.message)
    }else{
      next()
    }
  } catch (error) {
    console.log(error)
  }
}
const catchAll = (err,req,res, next) => {
  try {
    if(err){
      res.status(500).send(err.message)
    }else{
      next()
    }
  } catch (error) {
    console.log("errror",error.errors)
  }
}
export default [catchAll, forbidden, badRequest, notFound]

import express from "express"
import services from "./src/services/index.js"
import createError from "http-errors"
import errorHandlers from "./src/utils/errorHandler.js"
import cors from "cors"
const app = express()
const PORT = process.env.PORT || 3001
const whitelist =  [process.env.FE_DEV_URL, process.env.FE_PROD_URL]
console.log('whitelist:', whitelist)


const corsOptions = {
  origin: function(origin, next){
    if(whitelist.indexOf(origin) !== -1){
      next(null, next)
    }else{
      next(createError(403, {message:"Origin not allowed"}))
    }
  }
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', services)
app.use(errorHandlers)

app.use(function(req, res, next){
  if(!req.route && !req.headersSent){
    res.send(createError(404, {message: "Route is not implemented"}))
  }else{
    next()
  }
})

app.listen(PORT, () => console.log("runns on " + PORT))
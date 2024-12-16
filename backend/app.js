const express = require('express')
const app = express()
require('dotenv').config()
const videoRoutes=require('./routes/videoRoutes.js')
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



//database connection
const mongoose = require('mongoose');



async function main() {
  await mongoose.connect(process.env.MONGO_URI);

}


main()
  .then(() => { console.log("database connected") })
  .catch(err => {
    console.log(err)
    console.log(process.env.MONGO_URI)
  }
  );


//cors  
//NOTE::::: add withCredentials when u set cookies in response
var cors = require('cors')
app.use(cors({
  origin: process.env.FRONTEND_URL
}))




//route
// app.get('/', (req, res) => {
//   res.json('hello from backend and cors configured')
// })
app.use('/',videoRoutes)

app.use('*',(req,res)=>{
  throw new Error("route not found",404)
})
//error
app.use((err, req, res, next) => {
  const { message = "something went wrong/default message to debug u have to dig dipper", statusCode = 500 } = err
  console.log("**********error**************")
  console.log("**********error**************")
  console.log(message,statusCode)
  console.log("**********error**************")
  console.log("**********error**************")
  res.status(statusCode).json({ message })
})


app.listen(process.env.PORT ||5000, () => { console.log(`server started on port ${process.env.PORT}`) })
// importing require libraries
const express = require('express')
const cors = require('cors')


// object of express
const app = express()


// importing folder path
const userRouter = require('./routes/user')


// middleware from different host
// app.use(cors)

// middleware for parsing json
app.use(express.json())


// routing the path
app.use('/user',userRouter)
app.use('/user',userRouter)




app.listen(4000,'0.0.0.0',()=>{
    console.log("Server Started on Port 4000 :)")
})


// importing require libraries
const express = require('express')
const cors = require('cors')
const utils = require('./utils')
const jwt = require('jsonwebtoken')


// object of express
const app = express()


// importing folder path
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const blogRouter = require('./routes/blog')
const config = require('./config')


// middleware from different host
app.use(cors())

// middleware for parsing json
app.use(express.json())


// middleware to verify the token
app.use((request, response, next) => {
    // check if token is required for the API
    if (request.url === '/user/login' ||  request.url === '/user/register') {
      // skip verifying the token
      next()
    } else {
      // get the token
      const token = request.headers['token']
        // console.log(token)
      if (!token || token.length === 0) {
        response.send(utils.createErrorResult('missing token'))
      } else {
        try {
          // verify the token
          const payload = jwt.verify(token,config.secret)
            // console.log(payload)
          // add the user Id to the request
          request.userId = payload['id']
  
          //TODO: expiry logic
  
          // call the real route
          next()
        } catch (ex) {
          response.send(utils.createErrorResult('invalid token'))
        }
      }
    }
  })



// routing the path
app.use('/user',userRouter)
app.use('/category',categoryRouter)
app.use('/blog',blogRouter)




app.listen(4000,'0.0.0.0',()=>{
    console.log("Server Started on Port 4000 :)")
})


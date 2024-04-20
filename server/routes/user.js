// importing libraries
const express = require('express')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')

// importing folder path
const db = require('../db')
const utils = require('../utils')
const config = require('../config')


// router object to route the request
const router = express.Router()


// register user route
router.post('/register',(request,response)=>{

    // object destructuring
    const {full_name,email,phone_no,password} = request.body

    // encrypting password
    const encryptedPassword = String(crypto.SHA256(password))

    // query statement
    const statement = `insert into user(full_name,email,phone_no,password) values (?,?,?,?);`

    // executing query
    db.pool.execute(
        statement,
        [full_name,email,phone_no,encryptedPassword],
        (error,result)=>{
            if(error){
                response.send(utils.createErrorResult(error))
            }
            else{
                response.send(utils.createSuccessResult(result))
            }
        }
    )
})


// login user route
router.get('/login',(request,response)=>{

    // object destructuring
    const {email,password} = request.body

    // encrypting password
    const encryptedPassword = String(crypto.SHA256(password))

    // query statement
    const statement = `select id,full_name, email, phone_no, isDeleted from user where email=? and password=?`;

    // executing query
    db.pool.query(
        statement,
        [email,encryptedPassword],
        (error,users)=>{
            if(error)
            {
                response.send(utils.createErrorResult(error))
            }
            else{
               
                if(users.length==0) // for user not found in database
                {
                    response.send(utils.createErrorResult("User Not Fount"))
                }
                else
                {
                    const user = users[0]

                    if(user.isDeleted) // user deleted account
                    {
                        response.send(utils.createErrorResult("User Account Deleted"))
                    }
                    else
                    {
                        // creating payload
                        const payload = {
                            id : user.id,
                            name : user.full_name,
                            email : user.email
                        }
                        // creating token
                        const token = jwt.sign(payload,config.secret)
                        
                        // user data to send
                        const userData = {
                            token,
                            name : user.full_name,
                            email : user.email,
                            phone : user.phone_no
                        } 
                        // response
                        response.send(utils.createSuccessResult(userData))
                    }
                }
            }
        }
    )
})


module.exports = router
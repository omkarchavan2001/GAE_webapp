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


// adding new category data in database
router.post('/add',(request,response)=>{
    // object destructuring
    const {title,description} = request.body


    
    // query statement
    const statement2 = `insert into category (title,description) values (?,?);`

    // executing query
    db.pool.execute(
        statement2,
        [title,description],
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


// fetching category data from database
router.get('/list',(request,response)=>{

    // sql query
    const statement = `select id, title, description from category;`

    // executing query
    db.pool.query(
        statement,(error,categories)=>{
            if(error){
                response.send(utils.createErrorResult(error))
            }
            else{
                response.send(utils.createSuccessResult(categories))
            }
        }
    )
})







module.exports = router
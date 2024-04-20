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

router.post('/add',(request,response)=>{

    const {title,content,category} = request.body
    const user_id = request.userId
    // console.log(title,content,category,user_id)

    //-------------------------------------------------------------------------------------
    var cat_id
    // to get category id
    const statement1 = `select id, title from category where title = ?;`
    // console.log("before query")
    db.pool.query(statement1,[category],(error,result)=>{
        if(error){
            console.log(utils.createErrorResult(error))
        }
        else{
            cat_id = result[0].id
                    //-------------------------------------------------------------------------------------
            // adding blog to the database
            // query statement
            const statement2 = `insert into blogs(title,content,user_id,category_id) values (?,?,?,?);`
            // console.log(title,content,user_id,cat_id)
            db.pool.execute(
                statement2,
                [title,content,user_id,cat_id],
                (error,result)=>{
                    if(error){
                        response.send(utils.createErrorResult(error))
                    }
                    else{
                        response.send(utils.createSuccessResult(result))
                    }
                }
            )
        }
    })

    

    
})


module.exports = router
const express = require('express');
const userModel = require('../models/User');
const app = express();


// backend hadnling of user signing up
app.post('/signup', async (req, res)=>{
    const user1=new userModel({
        ...req.body
    })


    await user1.save()
        .then(()=>{
            console.log(user1)
            res.status(200).send('signup successful')
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).send(e)
        })

})


// backend handling of user logging in
app.post('/login', async (req, res)=>{

    const {username, password}=req.body
    const if_user_exists=await userModel.findOne({username:username, password:password})
    if(if_user_exists){
        console.log(`${username} logged in`)
        res.status(200).send('user logged in')
    }
    else {
        console.log(`${username} does not exist`)
        res.status(500).send(`${username} does not exist`)
    }

})

module.exports=app
const express = require('express');
const userModel = require('../models/User');
const app = express();


// backend hadnling of user signing up
app.post('/signup', async (req, res)=>{
    const user1=new userModel({
        ...req.body
    })

    try{
        await user1.save()
        console.log(user1)
        res.status(200).send('signup successful')
    }
    catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
})


// backend handling of user logging in
app.post('/login', (req, res)=>{
    try{
        const user_info=req.body
        const user1=userModel.find({username:user_info.username, password:user_info.password})
        if (user1 != undefined){
            console.log(user1)
            res.status(200).send()
        }
        else {
            throw new Error("user does not exist")
        }

    }catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
})

module.exports=app
const express = require('express');
const userModel = require('../models/User');
const app = express();
const GroupMessageModel=require('../models/GroupMessageModel')


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

app.post('/chat', async (req, res)=>{
    const newObj_group_msg=new GroupMessageModel({...req.body})
    await newObj_group_msg.save()
        .then(()=>{
            console.log('message saved')
            res.status(200).send(newObj_group_msg)
        })
        .catch((e)=>{
            console.log(e)
        })
})

app.post('/chatinfo', (req, res)=>{
    GroupMessageModel.find({room:req.body.room})
        .then((list)=>{
            res.status(200).send(list)
        })
        .catch(e=>{console.log(e)})

})




module.exports=app
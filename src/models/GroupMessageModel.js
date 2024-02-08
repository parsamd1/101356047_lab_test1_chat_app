const mongoose=require('mongoose')

const groupMessageSchema=new mongoose.Schema({
    from_user:{
        type:String,
    },
    room:{
        type:String,
    },
    message:{
        type:String,
    },
    date_sent:{
        type:Date
    }
})

const GroupMessageModel=mongoose.model('groupMessage', groupMessageSchema)
module.exports=GroupMessageModel
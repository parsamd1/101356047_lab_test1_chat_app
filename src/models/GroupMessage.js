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

const GroupMessage=mongoose.model('GroupMessage', groupMessageSchema)
module.exports=GroupMessage
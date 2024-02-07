const mongoose=require('mongoose')

const privateMessageSchema=new mongoose.Schema({
    from_user:{
        type:String
    },
    to_user:{
        type:String
    },
    message:{
        type:String
    },
    date_sent:
        {
            type:String
        }
})

const PrivateMessage=mongoose.model('PrivateMessage', privateMessageSchema)
module.exports = PrivateMessage
const mongoose=require('mongoose')

var userSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    firstname:
        {
            type: String,
            required: true,
        },
    lastname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    createon:{
        type:Date,
    }
})

const User = mongoose.model('user', userSchema)
module.exports=User
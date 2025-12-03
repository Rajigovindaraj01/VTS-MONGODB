//task3

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String , required: true},
    email:{
        type: String, 
        requred:[true,"Email is required"], //task6 also binded
        unique:true
    },
    age:{
        type:Number,
        min:[1,"Age must be atleast 1"],//task6
        createdAt : {type:Date,default:Date.now} //task7 also
    }
});

module.exports = mongoose.model("day12tasks-users",userSchema);
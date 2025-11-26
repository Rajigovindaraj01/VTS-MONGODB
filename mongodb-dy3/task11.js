const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongodb-day3')
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

const task11Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"Customer"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const task11data = mongoose.model('task11data',task11Schema);

const task11 = new task11data({
    name:'priya'
})

task11.save()
.then(()=>console.log("User Saved"))
.catch((err)=>console.log(err));
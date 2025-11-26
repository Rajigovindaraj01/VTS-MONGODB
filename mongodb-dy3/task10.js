const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongodb-day3')
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

const task10Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    age:{
        type:Number,
        required:true,
        min:1,
        max:100
    }
});

const task10data = mongoose.model('task10data',task10Schema);

const task10 = new task10data({
    name:"Rajeshwari",
    email:'raji@gmail.com',
    age:24
})

task10.save()
.then(()=>console.log("Student Saved"))
.catch((err)=>console.log("Error:",err));

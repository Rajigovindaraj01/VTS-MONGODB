const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(()=>console.log("MONGODB CONNECTED"))
.catch(err=> console.log(err));

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number
})

userSchema.index({email:1});

const user = mongoose.model("task1-user",userSchema)

async function run() {
    await user.create({
        name:'Raji',
        email:'raji@gmail.com',
        age:24
    })
    const result = await user.findOne({email:"raji@gmail.com"})
    console.log(result);
}
run()
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongodb-day3')
.then(()=>console.log("DB Connectesd"))
.catch(err=>console.log(err));

const task5schema = new mongoose.Schema({
    name:String,
    age:Number,
    city:String
})

const task4data = mongoose.model('task5schema',task5schema);

const newData = new task4data({
    name:'Raji',
    age:24,
    city:'Thanjavur'
})

newData.save()
  .then(() => console.log("Single Document Inserted Successfully"))
  .catch(err => console.log(err));

module.exports = task4data
//task4

const express = require('express');
const User = require('../models/User');

const router = express.Router();

//task4
router.post('/users',async (req,res)=>{
    try{
        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json({message:'user Created',data:newUser})
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})


//task5
router.get('/users', async(req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;
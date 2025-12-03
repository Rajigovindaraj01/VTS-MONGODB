const express = require('express');
const product = require('../models/product');

const router = express.Router();

router.post('/products',async(req,res)=>{
    try{
        const newProduct = new product(req.body);
        await newProduct.save();
        res.status(201).json({message:'Product Created',data: newProduct})
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
});

router.get('/products',async (req,res)=>{
    try{
        const products = await product.find();
        res.json(products);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

module.exports = router;
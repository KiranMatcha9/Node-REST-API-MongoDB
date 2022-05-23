const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//Getting All
router.get('/', async (req,res)=>{
    
    try {
        const subscribers = await Subscriber.find({})
        res.send(subscribers);
    } catch (error) {
        res.status(500).json({msg:error.message})
    } 
})


//Getting one
router.get('/:id',getSubscriber,(req,res)=>{
    res.status(201).json(res.subscriber)
})


//Create one
router.post('/',async (req,res)=>{
    const subscriber = new Subscriber(
        {
            name:req.body.name,
            subscribedToChannel:req.body.subscribedToChannel
        }
    )
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json({newSubscriber})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})


//update one
router.patch('/:id', getSubscriber, async (req,res)=>{
    if(req.body.name){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubcriber = await res.subscriber.save()
        res.json({updatedSubcriber})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})


//Delete one
router.delete('/:id',getSubscriber,async (req,res)=>{
    try {
        await res.subscriber.delete()
        res.status(201).json({msg:'user deleted'})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})


//Middleware

async function getSubscriber(req,res,next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(!subscriber){
            return res.status(404).json({msg:`User with id ${req.params.id} not found`})
         }
    } catch (error) {
       return  res.status(500).json({msg:error.message})
    }
    res.subscriber = subscriber
    console.log(res.subscriber);
    next()
}

module.exports = router
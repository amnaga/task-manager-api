const express = require('express')
const User = require("../models/user")
const auth = require("../middleware/auth")
const multer = require("multer")
const sharp = require('sharp')
const { sendWelcomeEmail } = require('../emails/account')
const router = new express.Router()

router.post('/apiusers/login', async (req,res) => {
    try{
        
        const user = await User.findByCredentials(req.body.email, req.body.password) 
        // if(!user)
        //     res.status(400).send({"message":"No user found"})
            
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch(e) {
        res.status(400).send(e)
    }
})
router.post('/apiusers/register', async (req, res) => {
    const user = new User(req.body)
    try{
        const userexist = await User.findOne({email:req.body.email})
        if(!userexist){
            await user.save()
            // sendWelcomeEmail(user.email, user.name)
            const token = await user.generateAuthToken()
            res.status(201).send({user})
        }else{
            res.status(400).send({message:"Email already been taken!"})    
        }
    } catch(e){
        res.status(400).send(e)
    }
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.get('/apiusers/:id', auth, async (req,res) => {
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
    // User.findById(_id).then((user) => {
    //     if(!user){
    //         res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/apiusers/update', auth, async (req, res) => {
    const _id = req.user.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password","age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'})
    }
    try{
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators:true}) 
        // const user = await User.findById(_id)
        const user = await req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

router.delete('/apiusers/delete',auth, async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.user.id)
        if(!user){
            res.status(404).send({error:'No user found!'})
        }
        // res.send(user)
        res.status(200).send({message:'User has deleted successfully!'})
    }catch(e){
        return res.status(500).send(e)
    }
})

router.post('/apiusers/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password","age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'})
    }
    try{
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators:true}) 
        const user = await User.findById(req.user._id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

//Upload user profile image
const upload = multer({
    limits:{
        filesize:1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
            cb(new Error('Please add only image file!'))
        }
        cb(undefined, true)
    }
})
router.post("/apiusers/me/avatars", auth, upload.single('avatars'), async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer;
    await req.user.save();
    res.status(200).send({message:"Your profile image updated successfully!"});
},(error, req, res, next) => {
    res.status(400).send({message:error.message});
})

//Delete user profile image
router.delete("/apiusers/me/avatars", auth, async (req,res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send(req.user);
})

//Get user profile image
router.get("/apiusers/:id/avatar", async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send({error:"There was an error while accessing your profile image!"})
    }
    await req.user.save();
    res.send(req.user);
})


module.exports = router;
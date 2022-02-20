const express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const User = require("../models/user")

router.get('/',(req,res)=>{
    User.find((err, docs) => {
        if(!err){
            res.render("user/list", {
                list:docs
            })
        }else{
            console.log("Error in retreving the user list : "+err)
        }
    })
})

router.get('/createuser',(req,res)=>{
    res.render('user/addOrEdit',{
        viewTitle:"Register User"
    });
})

router.post('/',(req,res)=>{
    if(req.body._id == "")
        insertRecord(req,res)
    else
        updateRecord(req,res)
})

function updateRecord(req,res){
    User.findOneAndUpdate({_id:req.body._id}, req.body, {new: false,runValidators: true}, (err, doc) => {
        if(!err) 
            res.redirect('users/list')
        else{
            if(err.name == "ValidationError"){
                handleValidationError(err,req.body)
                res.render('user/addOrEdit',{
                    viewTitle:"Register User",
                    userFormData:req.body
                });
            } else 
                console.log('Error during user insertion.' + err)
        }
    })
}

function insertRecord(req,res){
    var user = new User()
    user.name = req.body.name
    user.age = req.body.age
    user.email = req.body.email
    user.password = req.body.password
    user.save((err,doc) => {
        if(!err)
            res.redirect('users/list')
        else{
            if(err.name == "ValidationError"){
                handleValidationError(err,req.body)
                res.render('user/addOrEdit',{
                    viewTitle:"Register User",
                    userFormData:req.body
                });
            } else 
                console.log('Error during user insertion.' + err)
        }
    })
}

function handleValidationError(err, body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case "name":
            body['nameError'] = err.errors[field].message;
            break
            case "age":
            body['ageError'] = err.errors[field].message;
            break
            case "email":
            body['emailError'] = err.errors[field].message;
            break
            case "password":
            body['passwordError'] = err.errors[field].message;
            break

        }
    }
}

router.get('/list',(req,res)=>{
    User.find((err, docs) => {
        if(!err){
            res.render("user/list", {
                list:docs
            })
        }else{
            console.log("Error in retreving the user list : "+err)
        }
    })
})

router.get('/createuser/:id',(req,res)=>{
    User.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("user/addOrEdit",{
                viewTitle:"Update User",
                userFormData:doc
            })
        }else{
        }
    })
})

router.get('/delete/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id,(err, docs) => {
        if(!err){
            res.redirect('/users/list')
        }else{
            console.log("Error in deleting the user record : "+err)
        }
    })
})


module.exports = router
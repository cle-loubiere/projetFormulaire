const mongoose = require('mongoose')
const User = require ('../models/user')

//Middle checking if the user is an admin
module.exports = (req,res,next)=>{
    
    const id = req.userData.userId
    console.log(id)
    User.findById(id) //Fetch the user because we can't trust the token for the admin role
    .exec()
    .then((result)=>{
        if(result && result.role == "admin"){ //check if user is admin
            next();
        }else{
            return res.status(401).json({
                message:"Not allowed failed",
            })
        }
    })
    .catch((err)=>{
        return res.status(500).json({
            error:err
        })
    })
    
    
}
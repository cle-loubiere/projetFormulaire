const mongoose = require('mongoose')

//Json Web Token
const jwt = require('jsonwebtoken')

//Hash de mot de passe
const argon2 = require('argon2');

//Import du schema de donnees
const User = require ('../models/user');

/*
* Fonction lancée la première fois et qui créer un admin
*/
exports.createAdmin = ()=>{
    
    User.find({role:"admin"}).exec()
    .then((res)=>{
        if(res.length<=0){
            //Hash password using argon2id
            argon2.hash(process.env.PWDADMIN,{
                type:argon2.argon2id,
                memoryCost:2 ** 16,
                hashLength:50
            }).then((hash)=>{ //Successful hash
                //Use schema to create new user
                const newUser = new User ({
                    _id : new mongoose.Types.ObjectId(),
                    email:process.env.EMAILADMIN,
                    password:hash,
                    role:'admin'
                });
                //Save the new user in the databse
                newUser.save()
            }).catch((err)=>{ //argon2 error
                console.log(err)
            })
        }
    })
    .catch((err)=>{ //Unknow moongoose error
        console.log(err)
    })
    
}

/*
* Fonction login qui regarde si l'utilisateur existe et renvoi un token le cas echeant
*/
exports.login = (req,res,next)=>{
    //Find if a user with the email given exists
    User.find({email:req.body.email}).exec()
    .then((findResult)=>{
        if(findResult.length < 1){//If there is none return an error
            return res.status(401).json({
                message:"No user found for this email and password combination"
            })
        }else{//If there is one verify that the given password is correct
            argon2.verify(findResult[0].password,req.body.password).
            then((result)=>{
                if(result){//The password is correct
                    //Create the token
                    const token = jwt.sign({
                        userId:findResult[0]._id,
                        email:findResult[0].email,
                        role:findResult[0].role
                    },process.env.JWTPRIVATEKEY,
                    {
                        expiresIn:"1h"
                    });
                    return res.status(200).json({
                        message:"Login Ok",
                        token : token
                    })
                }else{//The password is incorrect
                    return res.status(401).json({
                        message:"No user found for this email and password combination"
                    })
                }
            }).catch((err)=>{//argon2 error
                res.status(500).json({
                    error:err
                })
            })
        }
    })
    .catch((err)=>{ //Mongo error for find
        res.status(500).json({
            error:err
        })
    })
}

/*
* Fonction signup qui chiffre le mot de passe puis enregistre l'utilisateur dans la db
*/
exports.signup = (req,res,next)=>{
    //Verifier les donnes recues
    if(req.body.email ===""||req.body.password===""||req.body.password!==req.body.passwordConfirmation){
        return res.status(422).json({
            message:"Wrong data"
        })
    }
    //Check if email is already use
    User.find({email:req.body.email}).exec()
    .then((findResult)=>{
        if(findResult.length >= 1){
            return res.status(409).json({
                message:"Email is already in use"
            })
        }else{
            //Hash password using argon2id
            argon2.hash(req.body.password,{
                type:argon2.argon2id,
                memoryCost:2 ** 16,
                hashLength:50
            }).then((hash)=>{ //Successful hash
                //Use schema to create new user
                const newUser = new User ({
                    _id : new mongoose.Types.ObjectId(),
                    email:req.body.email,
                    password:hash,
                    role:'user'
                });
                //Save the new user in the databse
                newUser.save()
                .then((result)=>{ //user created
                    res.status(201).json({
                        message:"User created"
                    })
                })
                .catch((err)=>{ //mongo error for save
                    console.log(err)
                    res.status(500).json({
                        error:err
                    })
                })
            }).catch((err)=>{ //argon2 error
                res.status(500).json({
                    error:err
                })
            })
        }
    })
    .catch((err)=>{ //Mongo error for find
        res.status(500).json({
            error:err
        })
    })  
}
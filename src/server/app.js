const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dossierRoutes = require('./routes/dossier');
const userRoutes = require('./routes/user');
const userController = require('./controllers/user')

if(process.env.JWTPRIVATEKEY == ""){
    console.error("Environment variable JWTPRIVATEKEY is not set.")
    process.exit(1)
}

//Connect to mongoDb
mongoose.connect(process.env.MONGODBCONNECTSTRING||'mongodb://localhost:27017/PR',function(err){
    if (err) {
        console.error("Connection to database failed, check your connection string and if the database is running")
        process.exit(1)
        //throw new Error("Connection to db failed")
    }
}); //Check ce qu'il se passe si la connexion échoue
mongoose.Promise =global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//Use morgan for logging request
app.use(morgan('dev'));

//Use body-parser to parse the Url
app.use(bodyParser.urlencoded({
    extended:false,
}))
app.use(bodyParser.json());

//Handle CORS errors
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

//Create a admin if no admin exists
userController.createAdmin()

//Routes which handle requests
app.use('/dossier', dossierRoutes);
app.use('/user', userRoutes);

/*
* Default route because no other routes can handle it
* Throw a 404 error 
*/
app.use((req,res,next)=>{
    const error = new Error('Ressource not Found');
    error.status = 404
    next(error)
})

//Handle errors in the application
app.use((error, req, res, next) => {
    res.status(error.status || 500) //use the status code of the error or 500 if not set or unknow error
    res.json({
        error:{
            message:error.message //use the error message or the error
        }
    })
})

module.exports = app
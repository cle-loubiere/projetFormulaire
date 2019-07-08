const express = require ('express')
const router = express.Router();
const mongoose = require('mongoose')
const promise = require('promise')
// imports pour le Stockage google
const {google} = require('googleapis');
const fs = require('fs');
const key = require('../../../driveKey.json');
const drive = google.drive('v3');
//Import du schema de donnees
const Dossier = require ('../models/dossier')
const User = require ('../models/user')

/*
* Fonction pour uploader un document vers Google Drive
*/
function uploadToDrive(filepath){
    return new Promise((resolve,reject)=>{
        //A enlever
        resolve(null)
        /*
        //Vérifier la taille du fichier 5Mo max

        //Schema de connexion a google drive via token
        const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        ['https://www.googleapis.com/auth/drive'],
        null
        );

        //verification du token
        jwtClient.authorize((authErr) => {
            if (authErr) { //token non valide
                console.log(authErr);
                reject(authErr); //Choisir ce qu'on fait s'il y a un problème d'auth
            }
            else{//token valide
                //nom du fichier
                const fileMetadata = {
                    name: 'dummy.pdf'
                };
                
                //type de fichier et localisation
                const media = {
                    mimeType: 'application/pdf',
                    body: fs.createReadStream(filepath)
                };
                
                //Envoi du fichier sur google drive
                drive.files.create({
                    auth: jwtClient,
                    resource: fileMetadata,
                    media,
                    fields: 'id'
                })
                .then((res,file)=>{//renvoi l'id du fichier
                    resolve(res.data.id);
                });//Faire la gestion d'erreur
            }
        });*/
    })
}

/*
* Fonction pour télécharge un document de Google Drive
*/
function downloadFromDrive(id){
    return new Promise((resolve,reject)=>{
    //Schema de connexion a google drive via token
    const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/drive'],
    null
    );

    //verification du token
    jwtClient.authorize((authErr) => {
        if (authErr) {//token non valide
            console.log(authErr);
            reject(authErr); //Choisir ce qu'on fait s'il y a un problème d'auth
        }
        else{//token valide
            //Ouverture du stream d'ecriture dans le fichier de destination
            var dest = fs.createWriteStream('./retour.pdf');

            //download du fichier avec l'id passe en parametre
            drive.files.get({auth: jwtClient, fileId: id, alt: 'media'}, 
                            {responseType: 'stream'},
                            function(err, res){
                            res.data
                            .on('end', () => { //Download termine
                                console.log('Download ok');
                            })
                            .on('error', err => {
                                console.log('Error during download', err);
                            })
                            .pipe(dest);//Transfert des donnees dans le fichier de destination
                }
            );
            resolve("Done")    
        }
    });})
    
}

/*
* Renvoie tous les dossiers si l'utilisateur est administrateur ou seulement les siens si c'est un utilisateur normal
*/
exports.getAllDossier = (req,res,next)=>{
    User.findById(req.userData.userId).exec()
    .then((user)=>{
        if(user.role === "user"){
            Dossier.find({idUser:req.userData.userId})
            .exec()//Trouve tous les dossiers de l'utilisateur
            .then(find => {
                res.status(200).json(find) //retourne tous les dossiers trouvés
            })
            .catch(err => {//Erreur inconnue mongo
                res.status(500).json({
                    error:err
                })
            })
        }else{
            Dossier.find()
            .exec()//Trouve tous les dossiers
            .then(find => {
                res.status(200).json(find) //retourne tous les dossiers
            })
            .catch(err => {//Erreur inconnue mongo
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
    /*check autorisation*/
    
}

// Renvoie une ressource pdf d'un dossier 
exports.getRessource = (req,res,next)=>{
    /*Check information = legales*/
    /*Check autorisations*/
    const id = req.params.IdDossier
    const ressourceName =  req.param.RessourceName

    Dossier.findById(id) //Find the dossier with the Id "IdDossier"
    .exec()
    .then(find =>{
        if(find){ //success case : a dossier with this Id exists
            downloadFromDrive(find[ressourceName])
            res.status(200).json(find)
        }else{ //error case : there's no dossier with this Id
            res.status(404).json({message:"No valid entry found for provided ID"})
        }
    })
    .catch(err => {//Unknown error server side
        res.status(500).json({error:err});
    })
}

//Créer un dossier
exports.createDossier = (req,res,next)=>{
    /*Check information = legales*/
    //console.log(req.files.avatar[0].filename)
    //verification des pdfs/image
    uploadToDrive('./uploads/'/*+req.files.avatar[0].filename*/).then(googleAdress=>{
    console.log('adresse google : ' + googleAdress)
    const newDossier = new Dossier({ //Create a new Dossier with the information given by user
        //information hors formulaire
        _id : new mongoose.Types.ObjectId(),
        idUser: req.userData.userId,
        etatDossier : "ouvert",
        //page1
        nom:req.body.nom,
        prenom:req.body.prenom,
        nationalite:req.body.nationalite,
        dateDeNaissance:req.body.dateDeNaissance,
        lieuDeNaissance:req.body.lieuDeNaissance,
        situationFamilliale:req.body.situationFamilliale, 
        adresse:req.body.adresse,
        codePostal:req.body.codePostal,
        villePays:req.body.villePays,
        telephone:req.body.telephone,
        mobile:req.body.mobile,
        email:req.body.email,

        //page 2
        bac:req.body.bac,
        anneeBac:req.body.anneeBac,
        mentionBac:req.body.mentionBac,
        nomCompletBac:req.body.nomCompletBac,
        nomFormation:req.body.nomFormation,
        adresseLieuFormation:req.body.adresseLieuFormation,
        arrayEtude:req.body.arrayEtude,
        arrayLangue:req.body.arrayLangue,
            //Voir comment utiliser des objets

        //page3
        stageText:req.body.stageText,
        sejourEtranger:req.body.sejourEtranger,
        connaissanceInformatique:req.body.connaissanceInformatique,
        sportsPratiques:req.body.sportsPratiques,
        pointsForts:req.body.pointsForts,
        autresCandidature:req.body.autresCandidature,

        //page4
        lettreDeMotivation:googleAdress
        })
    newDossier.save().then(result => { //Save the dossier in the database
        console.log(result)
        //fs.unlinkSync('./uploads/'+req.files.avatar[0].filename)
        res.status(201).json({
            message:"posting a new dossier " + req.body.name,
            newDossier: newDossier
        })
    }).catch(error=>{ //Unknown error server side
        //fs.unlinkSync('./uploads/'+req.files.avatar[0].filename)
        console.log(error)
        res.status(500).json({
            error:err
        })
    })})
    
}

//Renvoie les informations d'un dossier
exports.getDossier = (req,res,next)=>{
    /*Check information = legales*/
    const id = req.params.IdDossier
    Dossier.findById(id) //Find the dossier with the Id "IdDossier"
    .exec()
    .then(find =>{
        if(find){ //success case : a dossier with this Id exists
            
            if((find.idUser.equals(req.userData.userId))
            ||(req.userData.role==="admin")){                
                res.status(200).json(find)
            }else{
                res.status(401).json({message:"Access unauthorized"})
            }
        }else{ //error case : there's no dossier with this Id
            res.status(404).json({message:"No valid entry found for provided ID"})
        }
    })
    .catch(err => {//Unknown error server side
        res.status(500).json({error:err});
    })

}

//Change le statut d'un dossier
exports.changeStatus = (req,res,next)=>{
    //Verifier le nouvel etat et mettre des CONSTANTES
    const id = req.params.IdDossier;
    console.log(id)
    Dossier.findById(id).exec()
    .then((find)=>{
        if((find.etatDossier == req.body.etatDossier)//Si pas de changement d'etat
        ||(find.etatDossier == "ouvert" && req.body.etatDossier == "en cours d'instruction")//ou d'ouvert à en cours d'instruction
        ||(find.etatDossier == "en cours d'instruction" && req.body.etatDossier == "rejeté")//ou d'en cours d'instruction à rejeté
        ||(find.etatDossier == "en cours d'instruction" && req.body.etatDossier == "supprimé")){//ou d'en cours d'instruction à fermé
            find.etatDossier = req.body.etatDossier
            find.save().then((result)=>{
                res.status(200).json({
                    newDossier:result
                })
            }).catch((err)=>{
                res.status(500).json({error:err});
            })
        }else{
            res.status(422).json({
                message:"Wrong state modification"
            })
        }
    })
    .catch((err)=>{
        res.status(500).json({error:err});
    }) 
}

//Update un dossier
exports.updateDossier = (req,res,next)=>{
    console.log(req.params.IdDossier)
    console.log(req.files)
    const id = req.params.IdDossier
    Dossier.findById(id) //Find the dossier with the Id "IdDossier"
    .exec()
    .then(find =>{
        if(find){ //success case : a dossier with this Id exists
            if(find.etatDossier!=="ouvert"){
                    res.status(401).json({message:"Access unauthorized"})
            }
            else if(find.idUser.equals(req.userData.userId)){
                const sendedData = { 
                    idUser: req.userData.userId,
                    etatDossier : "ouvert",
                    //page1
                    nom:req.body.nom,
                    prenom:req.body.prenom,
                    nationalite:req.body.nationalite,
                    dateDeNaissance:req.body.dateDeNaissance,
                    lieuDeNaissance:req.body.lieuDeNaissance,
                    situationFamilliale:req.body.situationFamilliale, 
                    adresse:req.body.adresse,
                    codePostal:req.body.codePostal,
                    villePays:req.body.villePays,
                    telephone:req.body.telephone,
                    mobile:req.body.mobile,
                    email:req.body.email,
            
                    //page 2
                    bac:req.body.bac,
                    anneeBac:req.body.anneeBac,
                    mentionBac:req.body.mentionBac,
                    nomCompletBac:req.body.nomCompletBac,
                    nomFormation:req.body.nomFormation,
                    adresseLieuFormation:req.body.adresseLieuFormation,
                    arrayEtude:req.body.arrayEtude,
                    arrayLangue:req.body.arrayLangue,
                        //Voir comment utiliser des objets
            
                    //page3
                    stageText:req.body.stageText,
                    sejourEtranger:req.body.sejourEtranger,
                    connaissanceInformatique:req.body.connaissanceInformatique,
                    sportsPratiques:req.body.sportsPratiques,
                    pointsForts:req.body.pointsForts,
                    autresCandidature:req.body.autresCandidature,
 
                }    
                Dossier.findByIdAndUpdate(id,sendedData)
                .then((update)=>//Update is a success 
                    res.status(200).json({update})
                ).catch((err)=>{//Unknown error server side
                    res.status(500).json({error:err});
                })
            }else{
                res.status(401).json({message:"Access unauthorized"})
            }
        }else{ //error case : there's no dossier with this Id
            res.status(404).json({message:"No valid entry found for provided ID"})
        }
    })
    .catch(err => {//Unknown error server side
        console.log(err)
        res.status(500).json({error:err});
    })

}
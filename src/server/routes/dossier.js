const express = require ('express')
const router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null,req.body.name+file.fieldname)
    }
})
const upload = multer({storage:storage})

// imports pour le Stockage google
const {google} = require('googleapis');

//Import du schema de donnees

const checkAuth = require('../middleware/check-auth')
const checkAdmin = require('../middleware/checkAdminRole')

//Import du controller
const DossierController = require('../controllers/dossier')





/*
* Route get qui renvoie tous les dossiers si l'utilisateur est administrateur ou seulement les siens si c'est un utilisateur normal
*/
router.get('/',checkAuth ,DossierController.getAllDossier)

/*
* WIP Route get qui renvoie une ressource pdf d'un dossier 
*/
router.get('/:IdDossier/:RessourceName', DossierController.getRessource)

/*
* Route pour creer un nouveau dossier
*/
router.post('/',checkAuth,upload.fields([{ name: 'files', maxCount: 1 }]), DossierController.createDossier)

/*
* Route get pour acceder aux informations du dossier IdDossier
*/
router.get('/:IdDossier',checkAuth, DossierController.getDossier)

/*
* Route patch pour modifier toutes les informations du dossier IdDossier
*/
router.patch('/:IdDossier',checkAuth,checkAdmin,DossierController.changeStatus)


/*
* Route put pour mettre à jour l'état du dossier IdDossier
*/
router.put('/:IdDossier',checkAuth,upload.fields([{ name: 'files', maxCount: 1 } ]), DossierController.updateDossier)


module.exports = router
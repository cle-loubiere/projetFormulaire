const mongoose = require('mongoose');



const dossierSchema = mongoose.Schema({

    //Informations hors formulaire
    _id: mongoose.Schema.Types.ObjectId,
    idUser: mongoose.Schema.Types.ObjectId,
    etatDossier:String,

    //page 1
    nom:String,
    prenom:String,
    nationalite:String,
    dateDeNaissance:Date,
    lieuDeNaissance:String,
    situationFamilliale:String, //Verification a faire dessus
    adresse:String,
    codePostal:String,//Pour les codes commencant par 0
    villePays:String,
    telephone:String,//Pour les numero commençant par 0
    mobile:String,//Pour les numero commençant par 0
    email:{type : String,
        match:/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/},
        //Cet email doit être unique ?*
        //la signature ??
    //page2
    bac:String,
    anneeBac:String,
    mentionBac:String,
    nomCompletBac:String,
    nomFormation:String,
    adresseLieuFormation:String,

    arrayEtude:[{annee:String,
        annee:String,
        etablissement:String,
        etude:String,
        moyenne:String,
        diplome:String,
        classement:String,
        mention:String
    }],

    arrayLangue:[{nomLangue:String,
        niveau:String,
        numeroLangue:String}
    ],
        //Voir comment utiliser des objets

    //page3
    stageText:String,
    sejourEtranger:String,
    connaissanceInformatique:String,
    sportsPratiques:String,
    pointsForts:String,
    autresCandidature:String,

    //page4
    lettreDeMotivation:String//RessourceGoogle
});

module.exports = mongoose.model('Dossier',dossierSchema)

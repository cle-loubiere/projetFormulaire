import axios from 'axios'

//envoie au serveur une requete pour obtenir tous les dossiers d'un utilisateur
export function dossierRequest(){
    return dispatch => {
        return axios.get('http://localhost:5000/dossier/',)
    }
}

//envoie au serveur une requete pour créer un dossier
export function dossierPost(dossier){
    return dispatch => {
        return axios.post('http://localhost:5000/dossier/',dossier)
    }
}

//envoie au serveur une requete pour récupérer les informations d'un dossier
export function getDossier(idDossier){
    return dispatch => {
        return axios.get('http://localhost:5000/dossier/'+idDossier)
    }
}

//Envoie au serveur une requete pour éditer un dossier
export function editDossier(idDossier,dossier){
    return dispatch => {
        return axios.put('http://localhost:5000/dossier/'+idDossier,dossier)
    }
}

//envoie au serveur une requete pour changer l'etat d'un dossier
export function changeDossierState(idDossier,etat){
    return dispatch => {
        return axios.patch('http://localhost:5000/dossier/'+idDossier,{etatDossier:etat})
    }
}
import axios from 'axios'

//envoie au serveur une requete d'inscription
export function userSignupRequest(userData){
    return dispatch => {
        return axios.post('http://localhost:5000/user/signup',userData)
    }
}
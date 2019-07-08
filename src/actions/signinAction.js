import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken'
import { SET_CURRENT_USER } from './types';

//envoie les infos sur l'utilisate au state
export function setCurrentUser(user){
    return {
        type:SET_CURRENT_USER,
        user:user
    }
}

//methode pour gérer la deconnexion : suppresion du token et changement du state
export function logout(){
    return dispatch =>{
        localStorage.removeItem('jwtToken')
        setAuthorizationToken(false)
        dispatch(setCurrentUser ({}))
    }
}

//envoie au serveur une requete de login
export function userSigninRequest(userData){
    return dispatch => {
        return axios.post('http://localhost:5000/user/login',userData).then((res)=>{
            const token = res.data.token
            localStorage.setItem('jwtToken',token)
            setAuthorizationToken(token)
            dispatch(setCurrentUser (jwt.decode(token)))
        })
    }
}
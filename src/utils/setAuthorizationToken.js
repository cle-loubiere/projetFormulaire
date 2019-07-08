import axios from 'axios'


//Setter de header pour axios quand on est connecté
export default function setAuthorizationToken(token){
    if(token){
        axios.defaults.headers.common['Authorization']= `Bearer ${token}`
    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}
import {combineReducers} from 'redux'
import auth from './authReducer'

//Root reducer
export default combineReducers({
    auth,
})
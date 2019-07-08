import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import { applyMiddleware,createStore } from 'redux';
import thunk from 'redux-thunk'
import setAuthorizationToken from './utils/setAuthorizationToken';
import rootReducer from './reducers/rootReducer';
import { setCurrentUser } from './actions/signinAction';
import jwt from 'jsonwebtoken'


const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

if(localStorage.jwtToken){
    setAuthorizationToken(localStorage.jwtToken)
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)))
}

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

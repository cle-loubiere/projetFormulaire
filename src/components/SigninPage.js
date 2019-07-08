import React from 'react'
import SigninForm from './SigninForm'
import {connect} from 'react-redux'
import {userSigninRequest} from '../actions/signinAction'
import propTypes from 'prop-types'


/*
Page de connexion
*/
class SigninPage extends React.Component{
    render() {
        const {userSigninRequest} = this.props
        return(
            <div >
                <h1>Connexion</h1>
                <div className='col-md-4'></div>
                <SigninForm userSigninRequest={userSigninRequest}></SigninForm>
                
            </div>
            
        );
    }
}
SigninPage.propTypes = {
    userSigninRequest : propTypes.func.isRequired
}
export default connect(null, {userSigninRequest})(SigninPage)
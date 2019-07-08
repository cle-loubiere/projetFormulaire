import React from 'react'
import SignupForm from './SignupForm'
import {connect} from 'react-redux'
import {userSignupRequest} from '../actions/signupAction'
import propTypes from 'prop-types'
 
/*
Page d'inscription
*/
class SignupPage extends React.Component{
    render() {
        const {userSignupRequest} = this.props
        return(
            <div >
                <div className='col-md-4'></div>
                <h1>Inscription</h1>
                <SignupForm userSignupRequest={userSignupRequest}></SignupForm>
                
            </div>
            
        );
    }
}
SignupPage.propTypes = {
    userSignupRequest : propTypes.func.isRequired
}

export default connect(null, {userSignupRequest})(SignupPage)
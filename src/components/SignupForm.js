import React from 'react'
import propTypes  from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import {Redirect} from "react-router-dom"
/*
Formulaire d'inscription
*/
class SignupForm extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            email : "", //field email
            password : "", //field password
            passwordConfirmation : "", //field password conformation
            isLoading:false,  //do not send multiple time the form
            redirect:false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    //appelé quand le formulaire est soumis
    onSubmit(e){
        e.preventDefault()
        this.props.userSignupRequest({  email:this.state.email,
                                        password:this.state.password,
                                        passwordConfirmation:this.state.passwordConfirmation
                                    }).then(
                                        (res)=>this.setState({redirect:true}),
                                        (err)=>this.setState({isLoading:false})
                                    )
    }

    //appelé pour mettre à jour le state
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        if(this.state.redirect){
            return <Redirect to="/" />
        }
        return(
            <form className='col-4 offset-4' onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input  value= {this.state.username}
                            onChange={this.onChange}
                            type="text" 
                            name="email" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Mot de passe</label>
                    <input  value= {this.state.username}
                            onChange={this.onChange}
                            type="password" 
                            name="password" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Confirmez votre mot de passe</label>
                    <input  value= {this.state.username}
                            onChange={this.onChange}
                            type="password" 
                            name="passwordConfirmation" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">{/**disable the button if the fields are not filled */}
                    <button disabled={this.state.isLoading||this.state.password!==this.state.passwordConfirmation
                                        ||isEmpty(this.state.email)||isEmpty(this.state.password)} className="btn btn-primary btn-lg">
                        Inscription
                    </button>
                </div>
            </form>
            
        );
    }
}
SignupForm.propTypes = {
    userSignupRequest : propTypes.func.isRequired
}

export default SignupForm
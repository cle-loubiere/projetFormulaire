import React from 'react'
import propTypes  from 'prop-types'
import {Redirect} from "react-router-dom"

/*
Formulaire de connexion
*/
class SigninForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email : "", //field email
            password : "",//field password
            isLoading:false, //do not send multiple time
            redirect:false //redirect to next page
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    //send request to log in
    onSubmit(e){
        e.preventDefault()
        this.setState({isLoading:true})
        this.props.userSigninRequest({email:this.state.email,password:this.state.password})
        .then(
            (res)=>this.setState({redirect:true}),
            (err)=>this.setState({isLoading:false})
        )
    }
    //update the state
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        if(this.state.redirect){
            return <Redirect to="/dossier" />
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
                    <button disabled= {this.state.isLoading} className="btn btn-primary btn-lg">
                        Connexion
                    </button>
                </div>
            </form>
            
        );
    }
}
SigninForm.propTypes = {
    userSigninRequest : propTypes.func.isRequired
}
export default SigninForm
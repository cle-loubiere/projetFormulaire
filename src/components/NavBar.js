import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import {logout} from '../actions/signinAction'


/*
Component navbar affiché en haut de l'écran
*/
class NavBar extends React.Component{
    
    //call when button logout if pushed
    logout(e){
        e.preventDefault()
        this.props.logout()
        this.setState({redirect:true})
    }

    render() {
        

        const isAuthenticated = this.props.auth.isAuthenticated
        const userLinks = ( //Links if logged
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <a href='/' onClick={this.logout.bind(this)} >Deconnexion</a>
                </li>
            </ul>
        )
        const guestLinks = ( //Links if not logged
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="/signup">Inscription</Link>
                </li>
            </ul>
        )

        return(
            <div>
                <nav className="navbar navbar-light bg-light">
                    <div className = "container-fluid">
                        <div className = "navbar-header">
                            <Link to={isAuthenticated ? "/dossier" : "/"} className="navbar-brand">Dossiers d'inscription</Link>
                        </div>

                        <div >
                            {isAuthenticated ? userLinks : guestLinks}
                        </div>
                    </div>
                </nav>  
            </div>
            
        );
        
    }
}
NavBar.propTypes = {
    auth :  propTypes.object.isRequired,
    logout : propTypes.func.isRequired
}

function MapStateToProps(state){
    return {
        auth : state.auth
    }
}

export default connect( MapStateToProps, {logout})(NavBar)
import React from 'react'
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import {Redirect} from "react-router-dom"

export default function (ComposedComponent){

    //Class to check if the user is logged or not
    class Authenticate extends React.Component{

        constructor(props){
            super(props)
            this.state = {
                redirect:""
            }
        }
        componentWillMount(){
            if(!this.props.isAuthenticated){
                this.setState({redirect:true})
            }
        }

        componentWillUpdate(nextProps){
            if(!nextProps.isAuthenticated){
                this.setState({redirect:true})
            }
        }

        render(){
            if(this.state.redirect){
                return <Redirect to="/" />
            }

            return (
                <ComposedComponent {...this.props}/>
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated : propTypes.bool.isRequired
    }

    function mapStateToProps(state){
        return {
            isAuthenticated:state.auth.isAuthenticated
        }
    }
    
    return connect (mapStateToProps)(Authenticate)
}
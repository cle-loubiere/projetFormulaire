import React from 'react'
import {connect} from 'react-redux'
import isEmpty  from 'lodash/isEmpty'
import {dossierRequest, changeDossierState} from '../actions/dossierAction'
import propTypes from 'prop-types'
import {Link} from 'react-router-dom'

/*
Component qui liste tous les dossiers auquel un utilisateur a accès
*/
class DossierListe extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dossiers:[]
        }
        this.instruire = this.instruire.bind(this)
    }
    //Methode pour les admin pour lancer l'instruction d'un dossier
    instruire(id){
        this.props.changeDossierState(id, "en cours d'instruction").then((result)=>{
            this.props.dossierRequest().then((res)=>{
                this.setState({dossiers:res.data})
            })
        })
    }
    //Charge les dossiers
    componentDidMount(){
        this.props.dossierRequest().then((res)=>{
            this.setState({dossiers:res.data})
        })
    }
    render() {
        const isAdmin = this.props.auth.user.role ==="admin"?true:false
        const creationButton = <Link to="/dossier/new" className="btn btn-primary">Créer un nouveau dossier</Link>

        //Liste des dossier, affiché différement suivant l'état du dossier
        const listeDossier = this.state.dossiers.map((dossier)=>
            {
                if(isAdmin && dossier.etatDossier === "ouvert"){
                return <tr key={dossier._id}>
                            <td>{dossier.nom}</td>
                            <td>{dossier.etatDossier}</td>
                            <td><button onClick={()=>this.instruire(dossier._id)} className="btn btn-danger">Lancer l'instruction</button></td>
                        </tr>
                }else if(isAdmin && dossier.etatDossier === "en cours d'instruction"){
                    return <tr key={dossier._id}>
                              <td>{dossier.nom}</td>
                              <td>{dossier.etatDossier}</td>
                              <td><Link to={"/dossier/"+dossier._id} className="btn btn-success">Instruire</Link></td>
                            </tr>
                }
                else{
                    return <tr key={dossier._id}>
                              <td>{dossier.nom}</td>
                              <td>{dossier.etatDossier}</td>
                              <td><Link to={"/dossier/"+dossier._id} className="btn btn-primary">Voir</Link></td>
                            </tr>
                }
            }
        )

        return(
            <div>
                <div className='col-6 offset-3'>
                    <div className='col-md-4'></div>
                    
                    
                    <h1>Liste des dossiers</h1>
                    {isEmpty(this.state.dossiers)?creationButton:<br/>}
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Nom</td>
                                <td>Etat</td>
                                <td>Accès</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listeDossier}
                        </tbody>
                    </table>
                    
                </div>
                
            </div>
            
        );
        
    }
}
DossierListe.propTypes = {
    auth :  propTypes.object.isRequired,
    dossierRequest : propTypes.func.isRequired,
    changeDossierState : propTypes.func.isRequired

}
function MapStateToProps(state){
    return {
        auth : state.auth
    }
}
export default connect(MapStateToProps, {dossierRequest, changeDossierState})(DossierListe)
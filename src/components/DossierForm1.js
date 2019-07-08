import React from 'react'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import map from 'lodash/map'
import situationFamilliale from '../common/situationFamilliale'
 
/*
Page 1 du formulaire
*/
class DossierForm1 extends React.Component{
    
    render() {
        //const {userSignupRequest} = this.props

        const situationFamillialeData = map(situationFamilliale,(val, key)=>
            <option key={key} value={val}>{key}</option>
        )
        return(
            <div >
                <div className='col-md-4'></div>


                <div className="form-group">
                    <label className="control-label">Nom</label>
                    <input  disabled={this.props.etat}  
                            value={this.props.nom}
                            onChange={this.props.onChange}
                            type="text" 
                            name="nom" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Prenom</label>
                    <input  disabled={this.props.etat}  
                            value={this.props.prenom}
                            onChange={this.props.onChange}
                            type="text" 
                            name="prenom" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Nationalite</label>
                    <input  disabled={this.props.etat}  
                            value={this.props.nationalite}
                            onChange={this.props.onChange}
                            type="text" 
                            name="nationalite" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Date de naissance</label>
                    <input  disabled={this.props.etat}  
                            value={this.props.dateDeNaissance}
                            onChange={this.props.onChange}
                            type="date" 
                            name="dateDeNaissance" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Lieu de naissance</label>
                    <input  disabled={this.props.etat}  
                            value={this.props.lieuDeNaissance}
                            onChange={this.props.onChange}
                            type="text" 
                            name="lieuDeNaissance" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Situation Familliale</label>
                    <select disabled={this.props.etat}  
                            value={this.props.situationFamilliale}
                            onChange={this.props.onChange}
                            type="text" 
                            name="situationFamilliale" 
                            className="form-control">
                            {situationFamillialeData}
                    </select>
                </div>

                <div className="form-group">
                    <label className="control-label">Adresse</label>
                    <input  disabled={this.props.etat}  
                            value={this.props.adresse}
                            onChange={this.props.onChange}
                            type="text" 
                            name="adresse" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Code postal</label>
                    <input  disabled={this.props.etat}  
                            value={this.props.codePostal}
                            onChange={this.props.onChange}
                            type="text" 
                            name="codePostal" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Ville/Pays</label>
                    <input  disabled={this.props.etat}  
                            value={this.props.villePays}
                            onChange={this.props.onChange}
                            type="text" 
                            name="villePays" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Telephone</label>
                    <input  disabled={this.props.etat}  
                            value={this.props.telephone}
                            onChange={this.props.onChange}
                            type="text" 
                            name="telephone" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Mobile</label>
                    <input  disabled={this.props.etat}  
                            value={this.props.mobile}
                            onChange={this.props.onChange}
                            type="text" 
                            name="mobile" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input  disabled={this.props.etat}  
                            value={this.props.email}
                            onChange={this.props.onChange}
                            type="text" 
                            name="email" 
                            className="form-control">
                    </input>
                </div>
            </div>
            
        );
    }
}
DossierForm1.propTypes = {
    etat : propTypes.bool.isRequired,
    nom : propTypes.string.isRequired,
    prenom : propTypes.string.isRequired,
    nationalite : propTypes.string.isRequired,
    dateDeNaissance : propTypes.string.isRequired,
    lieuDeNaissance : propTypes.string.isRequired,
    situationFamilliale : propTypes.string.isRequired,
    adresse : propTypes.string.isRequired,
    codePostal : propTypes.string.isRequired,
    villePays : propTypes.string.isRequired,
    telephone : propTypes.string.isRequired,
    mobile : propTypes.string.isRequired,
    email : propTypes.string.isRequired,
    onChange : propTypes.func.isRequired
}

export default connect(null, null)(DossierForm1)
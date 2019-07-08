import React from 'react'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
 

/*
Page 3 du formulaire
*/
class DossierForm3 extends React.Component{
    render() {
        return(
            <div >
                <div className='col-md-4'></div>
                

                <div className="form-group">
                    <label className="control-label">Stages</label>
                    <textarea disabled={this.props.etat}
                            rows="10"
                            value={this.props.stageText}
                            onChange={this.props.onChange}
                            type="text" 
                            name="stageText" 
                            className="form-control">
                    </textarea>
                </div>

                <div className="form-group">
                    <label className="control-label">Sejours a l'etranger</label>
                    <textarea disabled={this.props.etat}
                             rows="10"
                            value={this.props.sejourEtranger}
                            onChange={this.props.onChange}
                            type="text" 
                            name="sejourEtranger" 
                            className="form-control">
                    </textarea>
                </div>

                <div className="form-group">
                    <label className="control-label">Connaissances Informatique</label>
                    <textarea disabled={this.props.etat}
                             rows="10"
                            value={this.props.connaissanceInformatique}
                            onChange={this.props.onChange}
                            type="text" 
                            name="connaissanceInformatique" 
                            className="form-control">
                    </textarea>
                </div>

                <div className="form-group">
                    <label className="control-label">Sports pratiques</label>
                    <textarea disabled={this.props.etat}
                             rows="10"
                            value={this.props.sportsPratiques}
                            onChange={this.props.onChange}
                            type="text" 
                            name="sportsPratiques" 
                            className="form-control">
                    </textarea>
                </div>

                <div className="form-group">
                    <label className="control-label">Points forts</label>
                    <textarea disabled={this.props.etat}
                             rows="10"
                            value={this.props.pointsForts}
                            onChange={this.props.onChange}
                            type="text" 
                            name="pointsForts" 
                            className="form-control">
                    </textarea>
                </div>

                <div className="form-group">
                    <label className="control-label">Autres candidature</label>
                    <textarea disabled={this.props.etat}

                            value={this.props.autresCandidature}
                            onChange={this.props.onChange}
                            type="text" 
                            name="autresCandidature" 
                            className="form-control">
                    </textarea>
                </div>
            </div>
            
        );
    }
}
DossierForm3.propTypes = {
    etat : propTypes.bool.isRequired,
    stageText : propTypes.string.isRequired,
    sejourEtranger : propTypes.string.isRequired,
    connaissanceInformatique : propTypes.string.isRequired,
    sportsPratiques : propTypes.string.isRequired,
    pointsForts : propTypes.string.isRequired,
    autresCandidature : propTypes.string.isRequired,
    onChange : propTypes.func.isRequired,
}

export default connect(null, null)(DossierForm3)
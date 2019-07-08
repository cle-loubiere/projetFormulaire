import React from 'react'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import ReactDataGrid from "react-data-grid"
import {Editors} from "react-data-grid-addons"
 
/*
Page 2 du formulaire
*/
class DossierForm2 extends React.Component{

    
    render() {
        //Pour créer la grille Etude
        const {DropDownEditor} = Editors
        const dropDownOuiNon = [
            {id:"oui",value:"Oui"},
            {id:"non",value:"Non"}
        ]
        const ouiNonEditor = <DropDownEditor key="editeur" options = {dropDownOuiNon}/>
        const columnsEtude = [
            {key:"annee",name:"Année",editable:false},
            {key:"etude",name:"Etudes",editable:true},
            {key:"etablissement",name:"Etablissement",editable:true},
            {key:"diplome",name:"Diplome",editable:true,editor:ouiNonEditor},
            {key:"moyenne",name:"Moyenne",editable:true},
            {key:"mention",name:"Mention",editable:true},
            {key:"classement",name:"Classement",editable:true}
        ];

        //Pour créer la grille Langue
        const dropDownNiveauLangue = [
            {id:"tresBon",value:"Très Bon"},
            {id:"moyen",value:"Moyen"},
            {id:"elementaire",value:"élementaire"},
        ]
        const niveauLangueEditor = <DropDownEditor key="editeur" options = {dropDownNiveauLangue}/>
        const columnsLangue = [
            {key:"numeroLangue",name:"Numero Langue",editable:false},
            {key:"nomLangue",name:"Langue",editable:true},
            {key:"niveau",name:"Niveau",editable:true,editor:niveauLangueEditor},
            
        ];


        return(
            <div >
                <div className='col-md-4'></div>
                
                <div className="form-group">
                    <label className="control-label">Bac</label>
                    <input disabled={this.props.etat}  
                            value={this.props.bac}
                            onChange={this.props.onChange}
                            type="text" 
                            name="bac" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Annee Scolaire Bac</label>
                    <input disabled={this.props.etat}  
                            value={this.props.anneeBac}
                            onChange={this.props.onChange}
                            type="text" 
                            name="anneeBac" 
                            className="form-control">
                    </input>
                </div>
                
                <div className="form-group">
                    <label className="control-label">Mention Bac TODO</label>
                    <input disabled={this.props.etat}  
                            value={this.props.mentionBac}
                            onChange={this.props.onChange}
                            type="text" 
                            name="mentionBac" 
                            className="form-control">
                    </input>
                </div>
                
                <div className="form-group">
                    <label className="control-label">Nom complet bac</label>
                    <input disabled={this.props.etat}  
                            value={this.props.nomCompletBac}
                            onChange={this.props.onChange}
                            type="text" 
                            name="nomCompletBac" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Nom formation</label>
                    <input disabled={this.props.etat}  
                            value={this.props.nomFormation}
                            onChange={this.props.onChange}
                            type="text" 
                            name="nomFormation" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Adresse Lieu Formation</label>
                    <input disabled={this.props.etat}  
                            value={this.props.adresseLieuFormation}
                            onChange={this.props.onChange}
                            type="text" 
                            name="adresseLieuFormation" 
                            className="form-control">
                    </input>
                </div>

                <div className="form-group">
                    <label className="control-label">Etudes</label>
                    <ReactDataGrid
                        enableCellSelect={!this.props.etat}
                        onGridRowsUpdated={this.props.arrayEtudeChange}
                        rowsCount={5}
                        rowGetter={i =>this.props.arrayEtude[i]}
                        name = "arrayEtude"
                        columns={columnsEtude}
                        
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Langues</label>
                    <ReactDataGrid
                        enableCellSelect={!this.props.etat}
                        onGridRowsUpdated={this.props.arrayLangueChange}
                        rowsCount={4}
                        rowGetter={i =>this.props.arrayLangue[i]}
                        name = "arrayLangue"
                        columns={columnsLangue}
                        
                    />
                </div>
            </div>
            
        );
    }
}
DossierForm2.propTypes = {
    etat : propTypes.bool.isRequired,
    bac : propTypes.string.isRequired,
    anneeBac : propTypes.string.isRequired,
    mentionBac : propTypes.string.isRequired,
    nomCompletBac : propTypes.string.isRequired,
    nomFormation : propTypes.string.isRequired,
    adresseLieuFormation : propTypes.string.isRequired,
    arrayEtude : propTypes.array.isRequired,
    onChange : propTypes.func.isRequired,
}

export default connect(null, null)(DossierForm2)

/**<input disabled={this.props.etat}  
                            value={this.props.bac}
                            onChange={this.props.onChange}
                            type="text" 
                            name="bac" 
                            className="form-control">
                    </input> */
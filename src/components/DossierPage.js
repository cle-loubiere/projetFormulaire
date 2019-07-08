import React from 'react'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import DossierForm1 from './DossierForm1'
import DossierForm2 from './DossierForm2'
import DossierForm3 from './DossierForm3'
import DossierForm4 from './DossierForm4'
import {dossierPost} from '../actions/dossierAction'
import {Redirect} from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'

const MINPAGE = 1;//le numero de la page minimale
const MAXPAGE = 4;//le numero de la page maximale

/*
Component qui contient le formulaire de creation de dossier. C'est lui qui gère le changement de page, et l'envoie du formulaire en Post
*/
class DossierPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page : MINPAGE,
            isLoading: false,
            redirect: false,
            //informations du formulaire
            //page1
            nom:'',
            prenom:'',
            nationalite:'',
            dateDeNaissance:'',
            lieuDeNaissance:'',
            situationFamilliale:'', 
            adresse:'',
            codePostal:'',
            villePays:'',
            telephone:'',
            mobile:'',
            email:'',

            //page 2
            bac:'',
            anneeBac:'',
            mentionBac:'',
            nomCompletBac:'',
            nomFormation:'',
            adresseLieuFormation:'',
            arrayEtude:[{annee:"2018/19"},{annee:"2017/18"},{annee:"2016/17"},{annee:"2015/16"},{annee:"2014/15"}],
            arrayLangue:[{numeroLangue:"Langue maternelle"},{numeroLangue:"LV1"},{numeroLangue:"LV2"},{numeroLangue:"LV3"}],
                //Voir comment utiliser des objets

            //page3
            stageText:'',
            sejourEtranger:'',
            connaissanceInformatique:'',
            sportsPratiques:'',
            pointsForts:'',
            autresCandidature:'',

            //page4
            lettreDeMotivation:''
        }
        this.onChange = this.onChange.bind(this)
        this.resetPage = this.resetPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.arrayEtudeChange = this.arrayEtudeChange.bind(this)
        this.arrayLangueChange = this.arrayLangueChange.bind(this)
        this.filesChange = this.filesChange.bind(this)
        this.filesRemove = this.filesRemove.bind(this)
    }

    //method called to change the state when array etude is changed
    arrayEtudeChange( {fromRow, toRow, updated }){
        this.setState(state => {
          const arrayEtude = cloneDeep(state.arrayEtude)
          arrayEtude[fromRow] = { ...arrayEtude[fromRow], ...updated };
          arrayEtude[fromRow] = { ...arrayEtude[fromRow], ...updated };
          return { arrayEtude:arrayEtude };
    }) };

    //method called to change the state when array langue is changed
    arrayLangueChange( {fromRow, toRow, updated }){
        this.setState(state => {
          const arrayLangue = cloneDeep(state.arrayLangue)
          arrayLangue[fromRow] = { ...arrayLangue[fromRow], ...updated };
          arrayLangue[fromRow] = { ...arrayLangue[fromRow], ...updated };
          return { arrayLangue:arrayLangue };
    }) };

    //method called when a file is added, to update the state
    filesChange(file){
        this.setState(state => {
            let files = cloneDeep(state.files)
            files.push(file)
            return { files:files };
        })
    }

    //method called when a file is removed, to update the state
    filesRemove(index){
        this.setState(state => {
            let files = cloneDeep(state.files)
            files.splice(index,1)
            return { files:files };
        })
    }

    //Permet de stocker les valeurs des champs dans le state
    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    //Envoie le formulaire de création
    submitForm(e){
        e.preventDefault()
        this.setState({isLoading:true})
        this.props.dossierPost(this.state).then(
            (res)=>this.setState({redirect:true}),
            (err)=>this.setState({isLoading:false})
        )
        
    }

    //Remet le numero de page à la borne la plus proche s'il avait changé par erreur
    resetPage(){
        if (this.state.page < MINPAGE){
            this.setState({
                page : MINPAGE
            })
        }else if (this.state.page > MAXPAGE){
            this.setState({
                page : MAXPAGE
            })
        }
    }

    //Passe à la page du formulaire précedente
    previousPage(){
        this.resetPage()
        if (this.state.page > MINPAGE){
            this.setState({
                page : this.state.page -1
            })
        }
    }

    //Passe à la page du formulaire suivante
    nextPage(){
        this.resetPage()
        if (this.state.page < MAXPAGE){
            this.setState({
                page : this.state.page + 1
            })
        }
    }
    render() {
        if(this.state.redirect){
            return <Redirect to="/dossier" />
        }

        let form;
        //affiche la page du formulaire suivant la valeur page dans le state et fournit les props
        if(this.state.page <= MINPAGE){
            form = <DossierForm1 onChange={this.onChange}
            etat={false}
            nom={this.state.nom} 
            prenom={this.state.prenom}
            nationalite={this.state.nationalite}
            dateDeNaissance={this.state.dateDeNaissance}
            lieuDeNaissance={this.state.lieuDeNaissance}
            situationFamilliale={this.state.situationFamilliale}
            adresse={this.state.adresse}
            codePostal={this.state.codePostal}
            villePays={this.state.villePays}
            telephone={this.state.telephone}
            mobile={this.state.mobile}
            email={this.state.email}
            ></DossierForm1>
        }else if (this.state.page === 2){
            form = <DossierForm2 onChange={this.onChange}
            arrayEtudeChange={this.arrayEtudeChange}
            arrayLangueChange={this.arrayLangueChange}
            etat={false}
            bac={this.state.bac}
            anneeBac={this.state.anneeBac}
            mentionBac={this.state.email}
            nomCompletBac={this.state.nomCompletBac}
            nomFormation={this.state.nomFormation}
            adresseLieuFormation={this.state.adresseLieuFormation}
            arrayEtude={this.state.arrayEtude}
            arrayLangue={this.state.arrayLangue}
            ></DossierForm2>
        }else if (this.state.page === 3){
            form = <DossierForm3 onChange={this.onChange}
            etat={false}
            stageText={this.state.stageText}
            sejourEtranger={this.state.sejourEtranger}
            connaissanceInformatique={this.state.connaissanceInformatique}
            sportsPratiques={this.state.sportsPratiques}
            pointsForts={this.state.pointsForts}
            autresCandidature={this.state.autresCandidature}
            ></DossierForm3>
        }else if (this.state.page >= MAXPAGE){
            form = <DossierForm4 filesChange={this.filesChange} 
            files={this.state.files}
            filesRemove={this.filesRemove}
            ></DossierForm4>
        }

        return(
            <div>
                <div className='col-8 offset-2'>
                <h1>Formulaire d'inscription</h1>
                    <div className='col-md-4'></div>
                    {form}
                    
                    
                    
                </div>
                <div className='row'>
                        <div className='col-6'>
                            <button disabled={this.state.page<=MINPAGE}className="btn btn-primary btn-lg" onClick={this.previousPage}>Précedent</button>
                        </div>
                        <div className='col-6'>
                            <button disabled={this.state.page>=MAXPAGE} className="btn btn-primary btn-lg" onClick={this.nextPage}>Suivant</button>
                        </div>
                </div>
                <button disabled={this.state.isLoading} className="btn btn-success btn-lg" onClick={this.submitForm}>Sauvegarder</button>
            </div>
            
        );
        
    }
}
DossierPage.propTypes = {
    dossierPost:propTypes.func.isRequired
}

export default connect(null, {dossierPost})(DossierPage)
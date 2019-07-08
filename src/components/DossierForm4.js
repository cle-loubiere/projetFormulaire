import React from 'react'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
 
class DossierForm4 extends React.Component{

    //Lis le contenu des fichiers uploadés et l'envoie au state
    readFiles(files){
        for(let i=0;i<files.length;++i){
            let reader = new FileReader()
            reader.onload=(e)=>{
                this.props.filesChange({nom:files[i].name,fichier:e.target.result})

            }
            reader.readAsDataURL(files[i])
            
        }
    }

    render() {
        const listeFichiers = this.props.files.map((file,index)=>
            {
                return <div>
                            <a href={file.fichier} download={file.nom}> {file.nom}</a>
                            <button className="btn btn-danger" onClick={(e)=>{this.props.filesRemove(index)}}>Supprimer</button>
                        </div>
            }
        )
        return(
            <div >
                <div className='col-md-4'></div>
                
                <h1>Fichiers complémentaires</h1>
                <p>Placez ici (au format pdf) votre lettre de motivation manuscrite ainsi que les fichiers qui pourraient compléter votre dossier. Taille maximale 5Mo.</p>

                <div className="form-group">
                    <input accept=".pdf" multiple={true} type='file' name='files' onChange={(e)=>{this.readFiles(e.target.files)}} />
                </div>
                {listeFichiers}
            </div>
            
        );
    }
}
DossierForm4.propTypes = {
    filesChange : propTypes.func.isRequired,
    filesRemove : propTypes.func.isRequired
}

export default connect(null, null)(DossierForm4)
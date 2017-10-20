import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Image} from '../../../../views/Api/';
import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    tema: PropTypes.object,
    mutateStyle: PropTypes.func,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this)
  }

  renderIcon(){

    if (!this.props.tema.imageId){

        return(

              <img src={No_Image} />
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.props.tema.imageId} width="50" crop="scale"/>

          )
      }                 
                      
  }

  render () {

  	//var xxx = '/slider/edit/'+this.props.slider.id;
    return (
     
                    <tr>
    
                      <td>{this.props.tema.name}</td>
                      <td>
                      
                       {this.renderIcon()}
                     
                      </td>
                      <td width='150'>
                         <Link to={`/setting/tema/edit/${this.props.tema.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateTema({
      variables: {
        idTema: this.props.tema.id
      }
    })

    window.location.reload();
  }
}

const deleteTema = gql`
  mutation deleteTema($idTema: ID!) {
    deleteTema(id: $idTema) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteTema, {name : 'mutateTema'})(List)

export default PageWithMutation

import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Image} from '../../../../views/Api/';
import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    tipe: PropTypes.object,
    mutateStyle: PropTypes.func,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this)
  }

  renderIcon(){

    if (!this.props.tipe.imageId){

        return(

              <img src={No_Image} />
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.props.tipe.imageId} width="50" crop="scale"/>

          )
      }                 
                      
  }

  render () {

  	//var xxx = '/slider/edit/'+this.props.slider.id;
    return (
     
                    <tr>
    
                      <td>{this.props.tipe.name}</td>
                      <td>
                      
                       {this.renderIcon()}
                     
                      </td>
                      <td width='150'>
                         <Link to={`/setting/tipe/edit/${this.props.tipe.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateTipe({
      variables: {
        idTipe: this.props.tipe.id
      }
    })

    window.location.reload();
  }
}

const deleteTipe = gql`
  mutation deleteTipe($idTipe: ID!) {
    deleteTipe(id: $idTipe) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteTipe, {name : 'mutateTipe'})(List)

export default PageWithMutation

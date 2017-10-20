import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Image} from '../../../../views/Api/';
import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    fasilitas: PropTypes.object,
    mutateFacility: PropTypes.func,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this)
  }

  renderIcon(){

    if (!this.props.fasilitas.imageId){

        return(

              <img src={No_Image} />
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.props.fasilitas.imageId} width="50" crop="scale"/>

          )
      }                 
                      
  }

  render () {

  	//var xxx = '/slider/edit/'+this.props.slider.id;
    return (
     
                    <tr>
    
                      <td>{this.props.fasilitas.name}</td>
                      <td>
                      
                       {this.renderIcon()}
                     
                      </td>
                      <td width='150'>
                         <Link to={`/setting/facility/edit/${this.props.fasilitas.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateFacility({
      variables: {
        id: this.props.fasilitas.id
      }
    })

    window.location.reload();
  }
}

const deleteFacility = gql`
  mutation deleteFacility($id: ID!) {
    deleteFacility(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteFacility, {name : 'mutateFacility'})(List)

export default PageWithMutation

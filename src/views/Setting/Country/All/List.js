import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Image} from '../../../../views/Api/';
import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    tipe: PropTypes.object,
    mutateCountry: PropTypes.func,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this)
  }

  

  render () {

  	//var xxx = '/slider/edit/'+this.props.slider.id;
    return (
     
                    <tr>
    
                      <td>{this.props.country.name}</td>
                      <td>
                      
                       {this.props.country.slug}
                     
                      </td>
                      <td width='150'>
                         <Link to={`/setting/country/edit/${this.props.country.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateCountry({
      variables: {
        idCountry: this.props.country.id
      }
    })

    window.location.reload();
  }
}

const deleteCountry = gql`
  mutation deleteCountry($idCountry: ID!) {
    deleteCountry(id: $idCountry) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteCountry, {name : 'mutateCountry'})(List)

export default PageWithMutation

import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Image} from '../../../../views/Api/';
import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    bahasa: PropTypes.object,
    mutateLanguage: PropTypes.func,
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
    
                      <td>{this.props.bahasa.name}</td>
                      <td>
                      
                       {this.props.bahasa.slug}
                     
                      </td>
                      <td width='150'>
                         <Link to={`/setting/language/edit/${this.props.bahasa.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateLanguage({
      variables: {
        is: this.props.bahasa.id
      }
    })

    window.location.reload();
  }
}

const deleteLanguage = gql`
  mutation deleteLanguage($id: ID!) {
    deleteLanguage(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteLanguage, {name : 'mutateLanguage'})(List)

export default PageWithMutation

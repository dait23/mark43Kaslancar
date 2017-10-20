import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Image} from '../../../../views/Api/';
import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    tempo: PropTypes.object,
    mutateTempo: PropTypes.func,
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
    
                      <td>{this.props.tempo.name} Hari</td>
                      <td>
                      
                       {this.props.tempo.slug}
                     
                      </td>
                      <td width='150'>
                         <Link to={`/setting/tempo/edit/${this.props.tempo.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateTempo({
      variables: {
        id: this.props.tempo.id
      }
    })

    window.location.reload();
  }
}

const deleteTempo = gql`
  mutation deleteTempo($id: ID!) {
    deleteTempo(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteTempo, {name : 'mutateTempo'})(List)

export default PageWithMutation

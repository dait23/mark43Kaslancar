import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Image} from '../../../../views/Api/';
import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    tempo: PropTypes.object,
    mutateSector: PropTypes.func,
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
    
                      <td>{this.props.sector.name}</td>
                      <td>
                      
                       {this.props.sector.slug}
                     
                      </td>
                      <td width='150'>
                         <Link to={`/setting/sector/edit/${this.props.sector.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateSector({
      variables: {
        id: this.props.sector.id
      }
    })

    window.location.reload();
  }
}

const deleteSector = gql`
  mutation deleteSector($id: ID!) {
    deleteSector(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteSector, {name : 'mutateSector'})(List)

export default PageWithMutation

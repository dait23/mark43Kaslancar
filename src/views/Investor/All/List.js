import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Avatar} from '../../../views/Api/';
import {Image} from 'cloudinary-react';

class ListBlog extends React.Component {

  static propTypes = {
    investor: PropTypes.object,
    mutateUser: PropTypes.func,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this)
  }
  renderStatus(){
  
    if (this.props.investor.user.status == '0'){

        return(

            <span className="badge badge-success">Active</span>
          )
    }
    if (this.props.investor.user.status == '1'){

        return(

            <span className="badge badge-warning">Block</span>
          )
    }else{

      return(

            <span className="badge badge-danger">Suspend</span>
          )
    }

  }
  
  renderAvatar(){

    if (this.props.investor.imageId == ""){

        return(

              <img src={No_Avatar} />
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.props.investor.imageId} width="50" crop="scale"/>

          )
      }                 
                      
  }

  render () {


    return (
     
                    <tr>
                      <td>{this.props.investor.firstName} &nbsp; {this.props.investor.lastName}</td>
                       <td>{this.props.investor.user.email}</td>
                       <td> {this.renderAvatar()}</td>
                        <td>{this.renderStatus()}</td>
                      <td width='150'>
                         <Link to={`/investor/edit/${this.props.investor.user.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateUser({
      variables: {
        idUser: this.props.investor.user.id
      }
    })

    window.location.reload();
  }
}

const deleteUser = gql`
  mutation deleteUser($idUser: ID!) {
    deleteUser(id: $idUser) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteUser, {name : 'mutateUser'})(ListBlog)

export default PageWithMutation

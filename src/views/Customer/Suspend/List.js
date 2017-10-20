import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Avatar} from '../../../views/Api/';
import {Image} from 'cloudinary-react';

class ListBlog extends React.Component {

  static propTypes = {
    page: PropTypes.object,
    mutateUser: PropTypes.func,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this)
  }
  
  renderStatus(){
  
    if (this.props.user.status == '0'){

        return(

            <span className="badge badge-success">Active</span>
          )
    }
    if (this.props.user.status == '1'){

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

    if (!this.props.user.customer.imageId){

        return(

              <img src={No_Avatar} />
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.props.user.customer.imageId} width="50" crop="scale"/>

          )
      }                 
                      
  }

  render () {

  	//var xxx = '/slider/edit/'+this.props.slider.id;
    return (
     
                    <tr>
                      <td>{this.props.user.name} &nbsp; {this.props.user.customer.lastName}</td>
                       <td>{this.props.user.email}</td>
                       <td> {this.renderAvatar()}</td>
                       <td>{this.renderStatus()}</td>
                      <td width='150'>
                         <span className="badge badge-success" onClick={this.handleActive} style={{cursor: 'pointer'}}>Actived</span>
                      </td>
                    </tr>
    )
  }

  handleActive = async () => {
    await this.props.mutateUser({
      variables: {
        id: this.props.user.id,
        status: 0
      }
    })

    window.location.reload();
  }
}

const updateUser = gql`
  mutation updateUser($id: ID!, $status: Int) {
    updateUser(id: $id, status: $status) {
      id
      status
    }
  }
`

const PageWithMutation = graphql(updateUser, {name : 'mutateUser'})(ListBlog)

export default PageWithMutation

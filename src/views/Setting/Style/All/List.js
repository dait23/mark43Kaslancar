import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Image} from '../../../../views/Api/';
import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    page: PropTypes.object,
    mutateStyle: PropTypes.func,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this)
  }

  renderIcon(){

    if (!this.props.style.imageId){

        return(

              <img src={No_Image} />
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.props.style.imageId} width="50" crop="scale"/>

          )
      }                 
                      
  }

  render () {

  	//var xxx = '/slider/edit/'+this.props.slider.id;
    return (
     
                    <tr>
    
                      <td>{this.props.style.name}</td>
                      <td>
                      
                       {this.renderIcon()}
                     
                      </td>
                      <td width='150'>
                         <Link to={`/setting/style/edit/${this.props.style.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateStyle({
      variables: {
        idStyle: this.props.style.id
      }
    })

    window.location.reload();
  }
}

const deleteStyle = gql`
  mutation deleteStyle($idStyle: ID!) {
    deleteStyle(id: $idStyle) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteStyle, {name : 'mutateStyle'})(List)

export default PageWithMutation

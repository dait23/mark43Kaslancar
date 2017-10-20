import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name} from '../../../views/Api/';
import {Image} from 'cloudinary-react';

class ListBlog extends React.Component {

  static propTypes = {
    page: PropTypes.object,
    mutateBlog: PropTypes.func,
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
                      <td>{this.props.blog.title}</td>
                      <td>{this.props.blog.category.name}</td>
                       <td>{this.props.blog.slug}</td>
                      <td> <Image cloudName={Cloudinary_Name} publicId={this.props.blog.imageId} width="200" crop="scale"/></td>
                      <td width='150'>
                         <Link to={`/blog/edit/${this.props.blog.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateBlog({
      variables: {
        idBlog: this.props.blog.id
      }
    })

    window.location.reload();
  }
}

const deletePage = gql`
  mutation deleteBlogs($idBlog: ID!) {
    deleteBlog(id: $idBlog) {
      id
    }
  }
`

const PageWithMutation = graphql(deletePage, {name : 'mutateBlog'})(ListBlog)

export default PageWithMutation

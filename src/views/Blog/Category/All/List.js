import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';


class List extends React.Component {

  static propTypes = {
    page: PropTypes.object,
    mutateCategory: PropTypes.func,
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
    
                      <td>{this.props.category.name}</td>
    
                      <td width='150'>
                         <Link to={`/blog/category/edit/${this.props.category.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateCategory({
      variables: {
        idCategory: this.props.category.id
      }
    })

    window.location.reload();
  }
}

const deleteCategory = gql`
  mutation deleteCategory($idCategory: ID!) {
    deleteBlogCategory(id: $idCategory) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteCategory, {name : 'mutateCategory'})(List)

export default PageWithMutation

import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';


class ListPage extends React.Component {

  static propTypes = {
    page: PropTypes.object,
    mutatePage: PropTypes.func,
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
                      <td>{this.props.page.title}</td>
                       <td>{this.props.page.slug}</td>
                      <td dangerouslySetInnerHTML={{ __html: this.props.page.description }} ></td>
                      <td width='150'>
                         <Link to={`/page/edit/${this.props.page.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutatePage({
      variables: {
        idPage: this.props.page.id
      }
    })

    window.location.reload();
  }
}

const deletePage = gql`
  mutation deletePages($idPage: ID!) {
    deletePages(id: $idPage) {
      id
    }
  }
`

const PageWithMutation = graphql(deletePage, {name : 'mutatePage'})(ListPage)

export default PageWithMutation

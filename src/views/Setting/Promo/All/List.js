import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';


class ListPage extends React.Component {

  static propTypes = {
    promo: PropTypes.object,
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
                      <td>{this.props.promo.title}</td>
                       <td>{this.props.promo.slug}</td>
                      <td>{this.props.promo.amount}</td>
                      <td width='150'>
                         <Link to={`/setting/promo/edit/${this.props.promo.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutatePromo({
      variables: {
        id: this.props.promo.id
      }
    })

    window.location.reload();
  }
}

const deletePromo = gql`
  mutation deletePromo($id: ID!) {
    deletePromo(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deletePromo, {name : 'mutatePromo'})(ListPage)

export default PageWithMutation

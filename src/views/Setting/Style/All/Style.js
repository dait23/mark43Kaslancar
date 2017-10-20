import React from 'react';
import { Link} from 'react-router-dom';
import List from './List';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import Loader from 'halogen/ScaleLoader'

class Stylex extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }
  
  
  componentDidMount() {
       this.forceUpdate();
  }
  render () {
  	console.log(this.props.data.allStyles);
    if (this.props.data.loading) {
      return (<div><Loader color="#26A65B" size="12px" margin="4px"/></div>)
    }


    return (
    <div className="anixmated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-tag"></i> Style Tour
                <Link to={'/setting/style/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add Style</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Icon</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
           {this.props.data.allStyles.map((style) => (
            <List
              key={style.id}
              style={style}
              refresh={() => this.props.data.refetch()}
            />
          ))}
           </tbody>
          </table>
        </div>
       </div>
         </div>
        </div>
      </div>

    )
  }
}

const FeedQuery = gql`query allStyles {
  allStyles (orderBy: name_DESC) {
    id
    slug
    name
    imageUrl
    imageId
   
  }  
}`

const ListPageWithData = graphql(FeedQuery, {
  options: { fetchPolicy: 'cache-and-network' }
})(Stylex)

export default ListPageWithData

import React from 'react';
import { Link} from 'react-router-dom';
import ListPage from './List';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import Loader from 'halogen/ScaleLoader'

class Page extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }
  
   constructor(props) {
    super(props);
    //this.forceUpdate();
    //this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
       this.forceUpdate();
  }
  render () {
    if (this.props.data.loading) {
      return (<div><Loader color="#26A65B" size="12px" margin="4px"/></div>)
    }

    return (
    <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-files-o"></i> Static Pages
                <Link to={'/page/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add Pages</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Slug</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
           {this.props.data.allPageses.map((page) => (
            <ListPage
              key={page.id}
              page={page}
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

const FeedQuery = gql`query allPageses {
  allPageses (orderBy: createdAt_DESC) {
    id
    title
    slug
    description
  }
}`


const ListPageWithData = graphql(FeedQuery, {
  options: { fetchPolicy: 'cache-and-network' }
})(Page)

export default ListPageWithData
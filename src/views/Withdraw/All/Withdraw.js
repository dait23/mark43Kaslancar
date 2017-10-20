import React from 'react';
import { Link} from 'react-router-dom';
import ListBlog from './List';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import Loader from 'halogen/ScaleLoader'

class Withdraw extends React.Component {

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
     
     console.log(this.props.data.allUsers);

    return (
    <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-files-o"></i> All Member : {this.props.data._allUsersMeta.count}
                <Link to={'/blog/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add Member</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Avatar</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
           {this.props.data.allUsers.map((user) => (
            <ListBlog
              key={user.id}
              user={user}
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

const FeedQuery = gql`query allUsers {
  allUsers (orderBy: createdAt_DESC) {
    id
    name
    email
    status
    profile{
      imageUrl
      imageId
    }
  }
  _allUsersMeta{
    count
  }
}`

const ListPageWithData = graphql(FeedQuery)(Member)

export default ListPageWithData
import React from 'react';
import { Link} from 'react-router-dom';
import ListBlog from './List';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import Loader from 'halogen/ScaleLoader'

class Blog extends React.Component {

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
                <i className="fa fa-files-o"></i> All Blogs
                <Link to={'/blog/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add Blog</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Slug</th>
                      <th>Cover</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
           {this.props.data.allBlogs.map((blog) => (
            <ListBlog
              key={blog.id}
              blog={blog}
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

const FeedQuery = gql`query allBlogs {
  allBlogs (orderBy: createdAt_DESC) {
    id
    title
    slug
    description
    category{
      name
    }
    imageUrl
    imageId
  }
}`

const ListPageWithData = graphql(FeedQuery)(Blog)

export default ListPageWithData
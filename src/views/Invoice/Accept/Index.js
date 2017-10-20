import React from 'react';
import { Link} from 'react-router-dom';
import ListBlog from './List';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import Loader from 'halogen/ScaleLoader'

class AcceptInvoice extends React.Component {

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
                <i className="fa fa-files-o"></i> All Accept Invoice 
              
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Due Date</th>
                      <th>Rating</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
           {this.props.data.allInvoices.map((invoice) => (
            <ListBlog
              key={invoice.id}
              invoice={invoice}
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

const FeedQuery = gql`query allInvoices {
  allInvoices (filter:{
    status: 1
  }, orderBy: rating_DESC) {
    id
    title
    price
    rating
    dueDate
  }
}`

const ListPageWithData = graphql(FeedQuery)(AcceptInvoice)

export default ListPageWithData
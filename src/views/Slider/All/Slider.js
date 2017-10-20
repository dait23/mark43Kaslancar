import React from 'react';
import { Link} from 'react-router-dom';
import ListSlider from './List';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import Loader from 'halogen/ScaleLoader'

class Slider extends React.Component {

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

    if (this.props.data.allBanners && this.props.data.allBanners.error) {
    return <div>Error</div>
   }

    return (
    <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> Banner / Slider
                <Link to={'/slider/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add Slider</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
           {this.props.data.allBanners.map((banner) => (
            <ListSlider
              key={banner.id}
              banner={banner}
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

const FeedQuery = gql`query allBanners {
  allBanners(orderBy: createdAt_DESC) {
    id
    title
    description
    imageUrl
    imageId
  }
}`

const ListPageWithData = graphql(FeedQuery)(Slider)

export default ListPageWithData
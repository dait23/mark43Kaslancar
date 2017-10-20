import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql, gql, compose } from 'react-apollo'
import fetchCategory from './query';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Loader from 'halogen/ScaleLoader'
const history = createBrowserHistory();



class CategoryEdit extends Component {

  static propTypes = {
    router: PropTypes.object,
    updateCategory: PropTypes.func,
    //refresh: PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = { 
    name: '',
    slug: '',
    data:'',
    }
    this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    //this.handlePost = this.handlePost.bind(this)
     this.handleNameChange = this.handleNameChange.bind(this)
  }

 
  componentDidMount() {
      this.forceUpdate();
  }

  handleNameChange(e) {
   this.setState({name: e.target.value});
 }

 
  handleChange(value) {
    this.setState({ name: value, slug: document.getElementById("slug").value });
  }

 
  render() {
    const { BlogCategory } = this.props.data;

    console.log(this.props.data);
  

    //var slugg = this.state.name;
    //var slugx = slugg.replace(/\s+/g,"-");
    //var sluger = slugx.toLowerCase();
 
   if (!BlogCategory) { 

    return <div><Loader color="#26A65B" size="12px" margin="4px"/></div>; 


   }
    
    return (

      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Edit </strong>Category 
              </div>
              <div className="card-block">
                <form className="form-horizontal">

                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder={BlogCategory.name}
                      onChange={this.handleNameChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Slug</label>
                    <div className="col-md-9">
                      <input type="text" id="slug" value={BlogCategory.slug} name="slug" className="form-control" placeholder="Slug"
                      onChange={(e) => this.setState({slug: e.target.value})}
                      />
                     
                    </div>
                  </div>
                 
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/blog/category/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}

export default graphql(fetchCategory, { options: (props) => { return { variables: { id: props.match.params.id } } }
, pollInterval: 5000})(CategoryEdit);
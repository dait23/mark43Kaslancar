import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql, gql, compose } from 'react-apollo'
//import fetchCategory from './query';
import {MainApi, MainLink} from '../../../../views/Api/';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Loader from 'halogen/ScaleLoader'
const history = createBrowserHistory();


//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')



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
    data:{},
    loading: true
    }
    this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    //this.handlePost = this.handlePost.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
  }

 
  componentDidMount() {
    var that = this;
    this.getData();
      
  }

  //componentWillUnmount() {
    // this.getData();
 //}
 
  getData(){
     var that = this;
      that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query BlogCategory($id: ID!) {
              Category(id: $id){
              id
              name
              slug
            }
            }
          `
          var queryVars = {
            id: this.props.match.params.id
          }
          var opts = {
            // custom fetch options
          }


          fetch(query, queryVars, opts).then(function (results) {
            if (results.errors) {
              //...
              return
            }
            //var BlogCategory = results.data.BlogCategory

            that.setState({
              data : results.data.Category,
              id:results.data.Category.id,
              name:results.data.Category.name,
              slug:results.data.Category.slug,
               loading:false
             });
            //...
          })

  }

  onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateCategory ($id: ID!, $name: String!,$slug: String!){
              updateCategory (id: $id ,name: $name, slug: $slug){
                id
                name
                slug               
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            name: this.state.name,
            slug: this.state.slug 
          }
          var opts = {
            // custom fetch options
          }


          fetch(query, queryVars, opts).then(function (results) {
            if (results.errors) {
              //...
              return
            }
            //var BlogCategory = results.data.BlogCategory

              that.getData();
            //...
          })


  } 
    handleNameChange(e) {
     this.setState({name: e.target.value});
   }

    handleSlugChange(e) {
     this.setState({slug: e.target.value});
   }

   
    handleChange(value) {
      this.setState({slug: document.getElementById("slug").value });
    }

 
  render() {
    if (this.state.loading) {
      return (<div><Loader color="#26A65B" size="12px" margin="4px"/></div>)
    }
  

    var slugg = this.state.name;
    var slugx = slugg.replace(/\s+/g,"-");
    var sluger = slugx.toLowerCase();
 
   //if (!BlogCategory) { 

    //return <div><Loader color="#26A65B" size="12px" margin="4px"/></div>; 


   //}
    
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
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Name"
                      onChange={this.handleNameChange}
                      onKeyUp={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Slug</label>
                    <div className="col-md-9">
                      <input type="text" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug"
                      
                      />
                     
                    </div>
                  </div>
                 
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/blog/category/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default CategoryEdit;

//export default graphql(fetchCategory, { options: (props) => { return { variables: { id: props.match.params.id } } }, pollInterval: 5000})(CategoryEdit);
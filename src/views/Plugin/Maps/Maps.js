import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql, gql, compose } from 'react-apollo'
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import {MainApi, MainLink} from '../../../views/Api/';
import Loader from 'halogen/ScaleLoader'
const history = createBrowserHistory();



class Google extends Component {

  static propTypes = {
    router: PropTypes.object,
    addMaps: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    apiMaps: '',
    analytics: '',
    slug: '',
    loading: true
    }
    //this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    //this.handlePost = this.handlePost.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
  }

 
  
  handleChange(value) {
    this.setState({ name: value});
  }
  
   componentDidMount() {
    var that = this;
    this.getData();
      
  }

   getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Google($slug: String!) {
              Google(slug: $slug){
              id
              apiMaps
              analytics
              slug
            }
            }
          `
          var queryVars = {
            slug: "google"
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
              data : results.data.Google,
              id:results.data.Google.id,
              apiMaps:results.data.Google.apiMaps,
              analytics:results.data.Google.analytics,
              slug:results.data.Google.slug,
              loading:false
             });
            //...
          })

  }
  

   onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateGoogle ($id: ID!, $analytics: String!,$slug: String!, $apiMaps: String!){
              updateGoogle (id: $id , apiMaps: $apiMaps, slug: $slug, analytics: $analytics){
                id
                apiMaps
                analytics
                slug               
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            apiMaps: this.state.apiMaps,
            analytics: this.state.analytics,
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
 
  render() {

    if (this.state.loading) {
      return (<div><Loader color="#26A65B" size="12px" margin="4px"/></div>)
    }
  
    return (
      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Google</strong>
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Google Maps Api</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.apiMaps} name="apiMaps" className="form-control" placeholder="Api Key"
                      onChange={(e) => this.setState({apiMaps: e.target.value})}
                      />
                    </div>
                  </div>
                 
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Google Analytics</label>
                    <div className="col-md-9">
                      <textarea id="textarea-input" value={this.state.analytics} name="analytics" rows="9" className="form-control" placeholder="Google Analytics Code" onChange={(e) => this.setState({analytics: e.target.value})}>
                        {this.state.analytics}
                      </textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
    
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}

export default Google;
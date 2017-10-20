import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql, gql, compose } from 'react-apollo'
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import {MainApi, MainLink} from '../../../views/Api/';
import Loader from 'halogen/ScaleLoader'
const history = createBrowserHistory();



class Flickr extends Component {

  static propTypes = {
    router: PropTypes.object,
    addMaps: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    apiKeys: '',
    secretKeys: '',
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
            query Flickr($slug: String!) {
              Flickr(slug: $slug){
              id
              apiKeys
              secretKeys
              slug
            }
            }
          `
          var queryVars = {
            slug: "flickr"
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
              data : results.data.Flickr,
              id:results.data.Flickr.id,
              apiKeys:results.data.Flickr.apiKeys,
              secretKeys:results.data.Flickr.secretKeys,
              slug:results.data.Flickr.slug,
              loading:false
             });
            //...
          })

  }
  

   onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateFlickr ($id: ID!, $apiKeys: String!,$slug: String!, $secretKeys: String!){
              updateFlickr (id: $id , apiKeys: $apiKeys, slug: $slug, secretKeys: $secretKeys){
                id
                apiKeys
                secretKeys
                slug               
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            apiKeys: this.state.apiKeys,
            secretKeys: this.state.secretKeys,
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
                <strong>Flickr</strong>
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Flickr Api Keys</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.apiKeys} name="apiKeys" className="form-control" placeholder="Api Key"
                      onChange={(e) => this.setState({apiKeys: e.target.value})}
                      />
                    </div>
                  </div>
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Flickr Secret Keys</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.secretKeys} name="secretKeys" className="form-control" placeholder="Secret Key"
                      onChange={(e) => this.setState({secretKeys: e.target.value})}
                      />
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

export default Flickr;
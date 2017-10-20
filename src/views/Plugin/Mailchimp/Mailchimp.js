import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql, gql, compose } from 'react-apollo'
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import {MainApi, MainLink} from '../../../views/Api/';
import Loader from 'halogen/ScaleLoader'
const history = createBrowserHistory();



class Mailchimp extends Component {

  static propTypes = {
    router: PropTypes.object,
    addMaps: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    code: '',
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
            query Mailchimp($slug: String!) {
              Mailchimp(slug: $slug){
              id
              code
              slug
            }
            }
          `
          var queryVars = {
            slug: "Mailchimp"
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
              data : results.data.Mailchimp,
              id:results.data.Mailchimp.id,
              code:results.data.Mailchimp.code,
              slug:results.data.Mailchimp.slug,
              loading:false
             });
            //...
          })

  }
  

   onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateMailchimp ($id: ID!, $code: String!,$slug: String!){
              updateMailchimp (id: $id , code: $code, slug: $slug){
                id
                code
                slug               
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            code: this.state.code,
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
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Mailchimp Code</label>
                    <div className="col-md-9">
                      <textarea id="textarea-input" value={this.state.code} name="code" rows="9" className="form-control" placeholder="Mailchimp Code " onChange={(e) => this.setState({code: e.target.value})}>
                        {this.state.code}
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

export default Mailchimp;
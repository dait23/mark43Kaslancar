import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql, gql, compose } from 'react-apollo'
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import {MainApi, MainLink} from '../../../views/Api/';
import Loader from 'halogen/ScaleLoader'

const history = createBrowserHistory();



class Amount extends Component {

  static propTypes = {
    router: PropTypes.object,
    addMaps: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    id:'',
    fee: '',
    minDonation: '',
    maxDonation: '',
    minInvoiceAmount: '',
    maxInvoiceAmount: '',
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
            query Setting($slug: String!) {
              Setting(slug: $slug){
              id
              fee
              minDonation
              maxDonation
              minInvoiceAmount
              maxInvoiceAmount
              slug
            }
            }
          `
          var queryVars = {
            slug: "amount"
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
              data : results.data.Setting,
              id:results.data.Setting.id,
              fee:results.data.Setting.fee,
              minDonation:results.data.Setting.minDonation,
              maxDonation:results.data.Setting.maxDonation,
              minInvoiceAmount:results.data.Setting.minInvoiceAmount,
              maxInvoiceAmount:results.data.Setting.maxInvoiceAmount,
              slug:results.data.Setting.slug,
              loading:false
             });
            //...
          })

  }
  

   onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updatSetting (
             $id: ID!,
             $slug: String!,
             $fee: String!, 
             $minDonation: String!,
             $maxDonation: String!, 
             $minInvoiceAmount: String!,
             $maxInvoiceAmount: String!

             ){
              updateSetting(
               id: $id,
               slug: $slug,
               fee: $fee,  
               minDonation: $minDonation,
               maxDonation: $maxDonation,  
               minInvoiceAmount: $minInvoiceAmount,
               maxInvoiceAmount: $maxInvoiceAmount
               ){
                id
                fee
                minDonation
                maxDonation
                minInvoiceAmount
                maxInvoiceAmount
                slug              
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            fee: this.state.fee,
            minDonation: this.state.minDonation,
            maxDonation: this.state.maxDonation,
            minInvoiceAmount: this.state.minInvoiceAmount,
            maxInvoiceAmount: this.state.maxInvoiceAmount,
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
                <strong>Invoice Amount Settings</strong>
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Kaslancar Fee(%)</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.fee} name="fee" className="form-control" placeholder="Kaslancar Fee(%)"
                      onChange={(e) => this.setState({fee: e.target.value})}
                      />
                    </div>
                  </div>
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Minimal Donation (%)</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.minDonation} name="minDonation" className="form-control" placeholder="Investor Minimal Donations (%)"
                      onChange={(e) => this.setState({minDonation: e.target.value})}
                      />
                    </div>
                  </div>

                 <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Maximal Donation (%)</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.maxDonation} name="maxDonation" className="form-control" placeholder="Investor Maximal Donations (%)"
                      onChange={(e) => this.setState({maxDonation: e.target.value})}
                      />
                    </div>
                  </div>
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Minimal Invoice Amount (Rp.)</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.minInvoiceAmount} name="minInvoiceAmount" className="form-control" placeholder="Minimal Invoice Amount"
                      onChange={(e) => this.setState({minInvoiceAmount: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Maximal Invoice Amount (Rp.)</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.maxInvoiceAmount} name="maxInvoiceAmount" className="form-control" placeholder="Maximal Invoice Amount"
                      onChange={(e) => this.setState({maxInvoiceAmount: e.target.value})}
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

export default Amount;
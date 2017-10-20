import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql, gql, compose } from 'react-apollo'
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import {MainApi, MainLink} from '../../../views/Api/';
import Loader from 'halogen/ScaleLoader'

const history = createBrowserHistory();



class Payment extends Component {

  static propTypes = {
    router: PropTypes.object,
    addMaps: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    paypalKeys: '',
    paypalSecret: '',
    dokuKeys: '',
    dokuSecret: '',
    midtransKeys: '',
    midtransSecret: '',
    stripeKeys: '',
    stripeSecret: '',
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
            query Payment($slug: String!) {
              Payment(slug: $slug){
              id
              paypalKeys
              paypalSecret
              dokuKeys
              dokuSecret
              midtransKeys
              midtransSecret
              stripeKeys
              stripeSecret
              slug
            }
            }
          `
          var queryVars = {
            slug: "payment"
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
              data : results.data.Payment,
              id:results.data.Payment.id,
              paypalKeys:results.data.Payment.paypalKeys,
              paypalSecret:results.data.Payment.paypalSecret,
              dokuKeys:results.data.Payment.dokuKeys,
              dokuSecret:results.data.Payment.dokuSecret,
              midtransKeys:results.data.Payment.midtransKeys,
              midtransSecret:results.data.Payment.midtransSecret,
              stripeKeys:results.data.Payment.stripeKeys,
              stripeSecret:results.data.Payment.stripeSecret,
              slug:results.data.Payment.slug,
              loading:false
             });
            //...
          })

  }
  

   onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updatePayment (
             $id: ID!,
             $slug: String!,
             $paypalKeys: String!, 
             $paypalSecret: String!,
             $dokuKeys: String!, 
             $dokuSecret: String!,
             $midtransKeys: String!, 
             $midtransSecret: String!,
             $stripeKeys: String!, 
             $stripeSecret: String!

             ){
              updatePayment(
               id: $id,
               slug: $slug,
               paypalKeys: $paypalKeys,  
               paypalSecret: $paypalSecret,
               dokuKeys: $dokuKeys,  
               dokuSecret: $dokuSecret,
               midtransKeys: $midtransKeys,  
               midtransSecret: $midtransSecret,
               stripeKeys: $stripeKeys,  
               stripeSecret: $stripeSecret

               ){
                id
                paypalKeys
                paypalSecret
                dokuKeys
                dokuSecret
                midtransKeys
                midtransSecret
                stripeKeys
                stripeSecret
                slug              
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            paypalKeys: this.state.paypalKeys,
            paypalSecret: this.state.paypalSecret,
            dokuKeys: this.state.dokuKeys,
            dokuSecret: this.state.dokuSecret,
            midtransKeys: this.state.midtransKeys,
            midtransSecret: this.state.midtransSecret,
            stripeKeys: this.state.stripeKeys,
            stripeSecret: this.state.stripeSecret,
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
                <strong>Payment</strong>
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Paypal Api Keys</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.paypalKeys} name="paypalKeys" className="form-control" placeholder="Api"
                      onChange={(e) => this.setState({paypalKeys: e.target.value})}
                      />
                    </div>
                  </div>
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Paypal Secret Keys</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.paypalSecret} name="paypalSecret" className="form-control" placeholder="Secret"
                      onChange={(e) => this.setState({paypalSecret: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Doku Api Keys</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.dokuKeys} name="dokuKeys" className="form-control" placeholder="Api"
                      onChange={(e) => this.setState({dokuKeys: e.target.value})}
                      />
                    </div>
                  </div>
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Doku Secret Keys</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.dokuSecret} name="dokuSecret" className="form-control" placeholder="Secret"
                      onChange={(e) => this.setState({dokuSecret: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Midtrans Api Keys</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.midtransKeys} name="midtransKeys" className="form-control" placeholder="Api"
                      onChange={(e) => this.setState({midtransKeys: e.target.value})}
                      />
                    </div>
                  </div>
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Midtrans Secret Keys</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.midtransSecret} name="midtransSecret" className="form-control" placeholder="Secret"
                      onChange={(e) => this.setState({midtransSecret: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Stripe Api Keys</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.stripeKeys} name="stripeKeys" className="form-control" placeholder="Api"
                      onChange={(e) => this.setState({stripeKeys: e.target.value})}
                      />
                    </div>
                  </div>
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Stripe Secret Keys</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.stripeSecret} name="stripeSecret" className="form-control" placeholder="Secret"
                      onChange={(e) => this.setState({stripeSecret: e.target.value})}
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

export default Payment;
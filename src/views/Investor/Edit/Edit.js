import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql, gql, compose } from 'react-apollo'
//import fetchCategory from './query';
import {MainApi, MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name, No_Avatar} from '../../../views/Api/';
import ReactQuill from "react-quill";
import Dropzone from 'react-dropzone'
import request from 'superagent';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Loader from 'halogen/ScaleLoader'
import {Image} from 'cloudinary-react';
const history = createBrowserHistory();


//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

class EditInvestor extends Component {

  static propTypes = {
    router: PropTypes.object,
    updatUser: PropTypes.func,
    //refresh: PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = { 
    id: '',
    firstName: '',
    lastName: '',
    status: '',
    imageUrl: '',
    imageId: '',
    profileId:'',
    uploadedFile: null,
    loading: true
    }
    //this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    //this.handlePost = this.handlePost.bind(this)
    //this.handleNameChange = this.handleNameChange.bind(this)
    //this.handleDes = this.handleDes.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
  }

  handleNameChange(e) {
     this.setState({title: e.target.value});
   }

   

    handleDes(value) {
    this.setState({ description: value});
  }

 
  componentDidMount() {
    var that = this;
    this.getData();
      
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        console.log(response.body);
        this.setState({
           imageUrl: response.body.secure_url,
           imageId: response.body.public_id
        });
      }
    });
  }

  //////////////////////
 
  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query User($id: ID!) {
              User(id: $id){
              id
              name
              status
              investor{
                id
                firstName
                lastName
                imageUrl
                imageId
              }
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
              data : results.data.User,
              id:results.data.User.id,
              name:results.data.User.name,
              status:results.data.User.status,
              firstName:results.data.User.investor.firstName,
              lastName:results.data.User.investor.lastName,
              imageId:results.data.User.investor.imageId,
              imageUrl:results.data.User.investor.imageUrl,
              profileId:results.data.User.investor.id,
              loading:false
             });
            //...
          })

  }

  onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation($id: ID!, $firstName: String, $lastName: String, $status: Int, $profileId: ID!, $imageId: String, $imageUrl: String){
  
              updateUser(id: $id, name: $firstName, status: $status){
                id
                status
              }
              updateInvestor( id: $profileId, imageId: $imageId, imageUrl: $imageUrl, firstName: $firstName, lastName: $lastName){
                id
                imageId
                imageUrl
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            status: parseInt(this.state.status),
            profileId: this.state.profileId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            imageId: this.state.imageId,
            imageUrl: this.state.imageUrl
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
            
            //that.getData();
            window.location= MainLink + "investor/all";
            window.location.reload(true);
            //...
          })


  } 
   



renderAvatar(){

    if (!this.state.imageId){

        return(

              <img src={No_Avatar} />
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.state.imageId} width="50" crop="scale"/>

          )
      }                 
                      
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
                <strong>Edit </strong> Customer
              </div>
              <div className="card-block">
                <form className="form-horizontal">

                <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input"></label>
                    <div className="col-md-9">
                      {this.renderAvatar()}
                    </div>
                  </div>

                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">First Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.firstName} name="firstName" className="form-control" placeholder="First Name"
                       onChange={(e) => this.setState({firstName: e.target.value})}
          
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Last Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.lastName} name="lastName" className="form-control" placeholder="Last Name"
                       onChange={(e) => this.setState({lastName: e.target.value})}
          
                      />
                    </div>
                  </div>

                  
                  
                 <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Status</label>
                    <div className="col-md-9">
                      
                         <select id="select" value={this.state.status}  name="status" className="form-control" onChange={(e) => this.setState({status: e.target.value})}>
                        
                          <option value="0">Active</option>
                          <option value="1">Block</option>
                          <option value="2">Suspend</option>
              
                                                              
                      </select>
                      
                    </div>
                  </div>
                 
                  
                  
                     <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="file-input">Avatar</label>
                    <div className="col-md-9">
                     <Dropzone
                      onDrop={this.onImageDrop.bind(this)}
                      multiple={false}
                      accept="image/*">
                      <div>Drop an image or click to select a file to upload.</div>
                    </Dropzone><br/>
                    </div>
                  </div>
                 
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/customer/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditInvestor;

//export default graphql(fetchCategory, { options: (props) => { return { variables: { id: props.match.params.id } } }, pollInterval: 5000})(CategoryEdit);
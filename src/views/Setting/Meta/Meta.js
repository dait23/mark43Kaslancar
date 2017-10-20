import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import ReactQuill from "react-quill";
import { graphql, gql, compose } from 'react-apollo'
import Dropzone from 'react-dropzone'
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Slug from 'react-slug';
import Loader from 'halogen/ScaleLoader';
import {MainApi, MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name} from '../../../views/Api/';
import request from 'superagent';
import {Image} from 'cloudinary-react';
const history = createBrowserHistory();

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

class Meta extends Component {

  static propTypes = {
     router: PropTypes.object,
     updateMeta: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    id:'',
    title: '',
    slug: '',
    keywords: '',
    description: '',
    address: '',
    phone: '',
    facebook: '',
    twitter: '',
    instagram: '',
    imageUrl: '',
    imageId: '',
     loading: true
    }
    this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    //this.handlePost = this.handlePost.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
  }

  
  handleChange(value) {
    this.setState({ address: value});
  }

 

  modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ]
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

componentDidMount() {
    var that = this;
    that.getData();
      
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
  //////////////////////
 
  getData(){
     var that = this;
      that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Meta($slug: String!) {
              Meta(slug: $slug){
              id
              title
              slug
              keywords
              description
              address
              phone
              facebook
              twitter
              instagram
              imageId
              imageUrl
            }
            }
          `
          var queryVars = {
            slug: "meta"
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
              data : results.data.Meta,
              id:results.data.Meta.id,
              title:results.data.Meta.title,
              slug:results.data.Meta.slug,
              description:results.data.Meta.description,
              keywords:results.data.Meta.keywords,
              address:results.data.Meta.address,
              phone:results.data.Meta.phone,
              facebook:results.data.Meta.facebook,
              twitter:results.data.Meta.twitter,
              instagram:results.data.Meta.instagram,
              imageId:results.data.Meta.imageId,
              imageUrl:results.data.Meta.imageUrl,
              loading:false
             });
            //...
            //console.log(this.state.data);
          })

  }

   onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateMeta ($id: ID!, $title: String!, $slug: String!, $description: String!, $imageUrl: String!, $imageId: String!, $keywords: String!, $address: String!, $phone: String!, $facebook: String!, $twitter: String!, $instagram: String!){
              updateMeta (id: $id, title: $title, slug: $slug, description: $description, imageId: $imageId, imageUrl: $imageUrl, keywords: $keywords, address: $address, phone: $phone, facebook: $facebook, twitter: $twitter, instagram: $instagram){
                id
                title
                slug
                keywords
                description
                address
                phone
                facebook
                twitter
                instagram
                imageId
                imageUrl       
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            title: this.state.title,
            slug: this.state.slug,
            description: this.state.description,
            keywords: this.state.keywords,
            address: this.state.address,
            phone: this.state.phone,
            facebook: this.state.facebook,
            twitter: this.state.twitter,
            instagram: this.state.instagram,
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
                <strong>Meta</strong> Website
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Title Site</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="title" className="form-control" placeholder="Title"
                       onChange={(e) => this.setState({title: e.target.value})}
                      />
                      <input type="hidden" id="text-input" value={this.state.id} name="id" className="form-control" />
                      <input type="hidden" id="text-input" value={this.state.slug} name="slug" className="form-control" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Keywords</label>
                    <div className="col-md-9">
                      <input type="text" id="slug" value={this.state.keywords} name="keywords" className="form-control" placeholder="Keywords"
                       onChange={(e) => this.setState({keywords: e.target.value})}
                      />
                     
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Telepon</label>
                    <div className="col-md-9">
                      <input type="text" id="slug" value={this.state.phone} name="phone" className="form-control" placeholder="Telepon"
                       onChange={(e) => this.setState({phone: e.target.value})}
                      />
                     
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Facebook</label>
                    <div className="col-md-9">
                     <input type="text" id="slug" value={this.state.facebook} name="facebook" className="form-control" placeholder="Facebook"
                       onChange={(e) => this.setState({facebook: e.target.value})}
                      />
                     
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Twitter</label>
                    <div className="col-md-9">
                      <input type="text" id="slug" value={this.state.twitter} name="twitter" className="form-control" placeholder="Twitter"
                       onChange={(e) => this.setState({twitter: e.target.value})}
                      />
                     
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Instagram</label>
                    <div className="col-md-9">
                      <input type="text" id="slug" value={this.state.instagram} name="instagram" className="form-control" placeholder="Instagram"
                       onChange={(e) => this.setState({instagram: e.target.value})}
                      />
                     
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Address</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.address}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="Address"
                    onChange={this.handleChange}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Description</label>
                    <div className="col-md-9">
                      <textarea id="textarea-input" value={this.state.description} name="description" rows="9" className="form-control" placeholder="description" onChange={(e) => this.setState({description: e.target.value})} >
                        {this.state.description}
                      </textarea>
                    </div>
                  </div>
                  
                     <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="file-input">Logo</label>
                    <div className="col-md-9">
                          
                          <Dropzone
                          onDrop={this.onImageDrop.bind(this)}
                          multiple={false}
                          accept="image/*">
                          <div>Drop an image or click to select a file to upload.</div>
                        </Dropzone><br/>
                         {this.state.imageUrl === '' ? null :
                        
                           <Image cloudName={Cloudinary_Name} publicId={this.state.imageId} width="300" crop="scale"/>
                        }
          
                    </div>
                  </div>
                 
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/dashboard'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }
  

}




export default Meta;
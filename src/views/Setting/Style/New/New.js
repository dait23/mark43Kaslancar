import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql, gql } from 'react-apollo'
import Dropzone from 'react-dropzone'
import request from 'superagent';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import {MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name} from '../../../../views/Api/';
import {Image} from 'cloudinary-react';
const history = createBrowserHistory();

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

class NewStyle extends Component {

  static propTypes = {
    router: PropTypes.object,
    addStyle: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    slug: '',
    name: '',
    imageUrl:'',
    imageId:'',
    uploadedFile: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  

  handleChange(value) {
    this.setState({ description: value })
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


 


  render() {
    const { content } = this.state
    var slugg = this.state.name;
    var slugx = slugg.replace(/\s+/g,"-");
    var sluger = slugx.toLowerCase();

    return (
      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New Style
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Name"
                      onChange={(e) => this.setState({name: e.target.value})}
                      onKeyUp={(e) => this.setState({slug: document.getElementById("slug").value})}
                      />
                    </div>
                  </div>
                 
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input"></label>
                    <div className="col-md-9">
                      <input type="hidden" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug"
                      />
                     
                    </div>
                  </div>
      
                 
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="file-input">Icon</label>
                    <div className="col-md-9">
                      
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
           {this.state.imageUrl === '' ? null :
          
            <Image cloudName={Cloudinary_Name} publicId={this.state.imageId} width="100" crop="scale"/>
          }
          
                    </div>
                  </div>
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/style/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const {name, slug, imageUrl, imageId} = this.state
    await this.props.addStyle({variables: {name, slug, imageUrl, imageId}})

   //history.push('#/slider/all');
   //history.goBack;
   window.location= MainLink + "setting/style/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addStyle($name: String!, $slug: String!, $imageUrl:String!, $imageId: String) {
    createStyle(name: $name, slug: $slug, imageUrl: $imageUrl, imageId: $imageId) {
      id
      name
      slug
      imageUrl
      imageId
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addStyle' })(NewStyle)

export default withRouter(PageWithMutation)

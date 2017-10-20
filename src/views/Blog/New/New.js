import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import ReactQuill from "react-quill";
import { graphql, gql, compose } from 'react-apollo'
import Dropzone from 'react-dropzone'
import request from 'superagent';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Slug from 'react-slug';
import Category from './Category';
import Loader from 'halogen/ScaleLoader';
import {Image} from 'cloudinary-react';
import {MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name} from '../../../views/Api/';
const history = createBrowserHistory();

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

class NewBlog extends Component {

  static propTypes = {
    router: PropTypes.object,
    data: PropTypes.object,
    addBlog: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    description: '',
    title: '',
    slug: '',
    categoryId:'',
    imageUrl: '',
    imageId: '',
    uploadedFile: null
    }
    this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

   componentDidMount() {
       this.forceUpdate();
  }

  
  handleChange(value) {
    this.setState({ description: value, slug: document.getElementById("slug").value });
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


  render() {
if (this.props.data.loading) {
      return (<div><Loader color="#26A65B" size="12px" margin="4px"/></div>)
    }
    const { content } = this.state
    var slugg = this.state.title;
    var slugx = slugg.replace(/\s+/g,"-");
    var sluger = slugx.toLowerCase();
 

    return (
      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New Blog
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Title Page</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="title" className="form-control" placeholder="Title"
                       onChange={(e) => this.setState({title: e.target.value})}
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
                 <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Category</label>
                    <div className="col-md-9">
                      <select id="select" value={this.state.categoryId}  name="categoryId" className="form-control" onChange={(e) => this.setState({categoryId: e.target.value})}>
                        <option>Please select category</option>
                       {this.props.data.allCategories.map((category) => (
            <Category
              key={category.id}
              category={category}
              refresh={() => this.props.data.refetch()}
            />
          ))}
                      </select>
                    </div>
                  </div>
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Description</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.description}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="description"
                    onChange={this.handleChange}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
                  
                     <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="file-input">Cover Image</label>
                    <div className="col-md-9">
                     <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
           {this.state.imageUrl === '' ? null :
          
            <Image cloudName={Cloudinary_Name} publicId={this.state.imageId} width="300" crop="scale"/>
          }
          
                    </div>
                  </div>
                 
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/blog/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }
  
  handlePost = async () => {
    //this.setState({slug: slug, imageId})
    const {title, description, slug, imageId, categoryId, imageUrl} = this.state
    await this.props.addBlog({variables: { 
      title, 
      description, 
      slug, 
      imageId, 
      imageUrl,
      categoryId
    }})

   //history.push('#/slider/all');
   window.location= MainLink + "blog/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addBlog($title: String!, $description: String, $slug: String!, $imageId: String!,  $imageUrl: String!, $categoryId: ID!) {
    createBlog(title: $title, description: $description, slug: $slug, imageId: $imageId, imageUrl: $imageUrl, categoryId: $categoryId) {
      id
      title
      slug
      category{
        name
        id
      }
      description
      imageUrl
      imageId
      
    }
  }
`
const FeedQuery = gql`query allCategories {
  allCategories (orderBy: createdAt_DESC) {
    id
    name

  }
}
  `
//const PageWithMutation = graphql( addMutation, { name: 'addBlog' })(NewBlog)
//const ListPageWithData = graphql(FeedQuery)
//export default withRouter(PageWithMutation)

export default compose(
  graphql(FeedQuery),
  graphql(addMutation, { name: 'addBlog' }),
)(NewBlog)

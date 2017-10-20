import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import ReactQuill from "react-quill";
import { graphql, gql } from 'react-apollo'
import Dropzone from 'react-dropzone'
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import {MainLink} from '../../../views/Api/';

import Slug from 'react-slug';
const history = createBrowserHistory();



class NewPage extends Component {

  static propTypes = {
    router: PropTypes.object,
    addPage: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    description: '',
    title: '',
    slug: '',
    }
    this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  
  handleChange(value) {
    this.setState({ description: value,slug: document.getElementById("slug").value });
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
                <strong>Add </strong> New Pages
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
      
                 
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/page/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    //this.setState({slug: slug})
    const {title, description, slug} = this.state
    await this.props.addPage({variables: { title, description, slug}})

   //history.push('#/slider/all');
   //window.location="http://localhost:3000/#/page/all";
    window.location= MainLink + "page/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addPage($title: String!, $description: String!, $slug: String!) {
    createPages(title: $title, description: $description, slug: $slug) {
      id
      title
      description
      slug
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addPage' })(NewPage)

export default withRouter(PageWithMutation)

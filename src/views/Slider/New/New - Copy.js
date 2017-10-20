import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import ReactQuill from "react-quill";
import { graphql, gql } from 'react-apollo'
import Dropzone from 'react-dropzone'
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
const history = createBrowserHistory();



class NewSlider extends Component {

  static propTypes = {
    router: PropTypes.object,
    addSlider: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    description: '',
    title: '',
    imageUrl: '',
    imageId: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  

  handleChange(value) {
    this.setState({ description: value })
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
    return (
      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New Slider
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Title Slider</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="title" className="form-control" placeholder="Title"
                      onChange={(e) => this.setState({title: e.target.value})}
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
      
                 
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="file-input">Image</label>
                    <div className="col-md-9">
                       {!this.state.imageId &&
          <Dropzone
            onDrop={this.onDrop}
            accept='image/*'
            multiple={false}
          >
            <div>Drop an image or click to choose</div>
          </Dropzone>}
          {this.state.imageUrl &&
            <img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
          }
          
                    </div>
                  </div>
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/slider/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }
  onDrop = (files) => {
    // prepare form data, use data key!
    let data = new FormData()
    data.append('data', files[0])

    // use the file endpoint
    fetch('https://api.graph.cool/file/v1/cj5nbkzhsejyd0122xngrnr17', {
      method: 'POST',
      body: data
    }).then(response => {
      return response.json()
    }).then(image => {
      this.setState({
        imageId: image.id,
        imageUrl: image.url,
      })
    })
  }
  handlePost = async () => {
    const {title, description, imageId} = this.state
    await this.props.addSlider({variables: { title, description, imageId }})

   //history.push('#/slider/all');
   window.location="http://localhost:3000/#/slider/all";
   window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addSlider($title: String!, $description: String!, $imageId: ID!) {
    createSlider(title: $title, description: $description, imageId: $imageId) {
      id
      title
      description
      image {
        url
      }
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addSlider' })(NewSlider)

export default withRouter(PageWithMutation)

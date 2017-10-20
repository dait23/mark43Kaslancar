import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import ReactQuill from "react-quill";
import { graphql, gql } from 'react-apollo'
import Dropzone from 'react-dropzone'
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Slug from 'react-slug';
import {MainLink} from '../../../../views/Api/';
const history = createBrowserHistory();



class NewPromo extends Component {

  static propTypes = {
    router: PropTypes.object,
    addPromo: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    description: '',
    title: '',
    slug: '',
    amount:'',
    }
    this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  
  handleChange(value) {
    this.setState({ description: value });
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
                <strong>Add </strong> New Promo
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Title</label>
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Amount</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.amount} name="title" className="form-control" placeholder="Promo Amount"
                       onChange={(e) => this.setState({amount: e.target.value})}
                      />
                    </div>
                  </div>
                 
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/promo/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    //this.setState({slug: slug})
    const {title, description, amount} = this.state
    await this.props.addPromo({variables: { title, description, amount}})

   //history.push('#/slider/all');
   window.location= MainLink + "setting/promo/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addPromo($title: String!, $description: String!, $amount: String!) {
    createPromo(title: $title, description: $description, amount: $amount) {
      id
      title
      description
      slug
      amount
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addPromo' })(NewPromo)

export default withRouter(PageWithMutation)

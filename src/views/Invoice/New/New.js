import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import ReactQuill from "react-quill";
import { graphql, gql, compose } from 'react-apollo'
import Dropzone from 'react-dropzone'
import request from 'superagent';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Loader from 'halogen/ScaleLoader';
import {Image} from 'cloudinary-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import IntlCurrencyInput from "react-intl-currency-input"
import 'react-datepicker/dist/react-datepicker.css';
import {MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name} from '../../../views/Api/';
const history = createBrowserHistory();

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

const userId = window.localStorage.getItem("x");
//const userIdx = window.localStorage.getItem("graphcoolToken");

//console.log(userId);
//console.log(userIdx);

const currencyConfig = {
  locale: "pt-ID",
  formats: {
    number: {
      IDR: {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

class NewInvoice extends Component {

  static propTypes = {
    router: PropTypes.object,
    data: PropTypes.object,
    addBlog: PropTypes.func,
  }
   defaultValue = 10000;

  constructor(props) {
    super(props)
    this.state = { 
    description: '',
    title: '',
    price: '',
    dueDate:'',
    imageUrl: '',
    imageId: '',
    startDate: moment(),
    valuex: this.defaultValue,
    maskedValue: "IDR10000",
    member: userId,
    uploadedFile: null
    }
    //this.handleSlug = this.handleSlug.bind(this)
    this.handlePost = this.handlePost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangex = this.handleChangex.bind(this);
     this.handleChangeIdr = this.handleChangeIdr.bind(this);
  }

  handleChangex(date) {
    this.setState({
      startDate: date
    });
  }

   handleChange(value) {
    this.setState({ description: value});
  }

 
  handleChangeIdr = (event, valuex, maskedValue) => {
    event.preventDefault();

    console.log(valuex); // value without mask (ex: 1234.56)
    console.log(maskedValue); // masked value (ex: R$1234,56)

    this.setState({
      valuex,
      maskedValue,
    });

  };
 
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

  
  

    return (
      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New Invoice
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Price Invoice</label>
                    <div className="col-md-9">
                      <IntlCurrencyInput currency="IDR" config={currencyConfig}
                        defaultValue={this.defaultValue}
                        onChange={this.handleChangeIdr}
                        autoFocus={false}
                        autoSelect={false}
                         className="form-control"
                />
                     
                    </div>
                  </div>
                 <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Due Date Invoice</label>
                    <div className="col-md-9">
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChangex}
                        locale="id"
                        className="form-control"
                        isClearable={true}
                        placeholderText="Due Date" />
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
                    <label className="col-md-3 form-control-label" htmlFor="file-input">Upload </label>
                    <div className="col-md-9">
                     <Dropzone
                        onDrop={this.onImageDrop.bind(this)}
                        multiple={false}
                        accept="application/pdf,">
                        <div>Upload Invoice (PDF/JPG/PNG).</div>
                      </Dropzone>
                       {this.state.imageUrl === '' ? null :
                      
                        <a href={`${this.state.imageUrl}`} ><i style={{fontSize:30}} className="fa fa-file-text-o"></i></a>
                        
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
    const {title, description, imageId, valuex, imageUrl, startDate, member} = this.state
    await this.props.addInvoice({variables: { 
      title, 
      description, 
      imageId, 
      imageUrl,
      valuex,
      startDate,
      member
    }})

   //history.push('#/slider/all');
   window.location= MainLink + "invoice/all";
   window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addInvoice($title: String!, $description: String, $valuex: Float, $imageId: String!,  $imageUrl: String!, $startDate: String!, $member: ID!) {
   createInvoice(
      title: $title,
      price: $valuex,
      description: $description,
      dueDate: $startDate,
      imageUrl: $imageUrl,
      imageId: $imageId,
      userId: $member,
    ){
    id
    }
  }
`



export default compose(
  //graphql(FeedQuery),
  graphql(addMutation, { name: 'addInvoice' }),
)(NewInvoice)

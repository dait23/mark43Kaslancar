import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql, gql, compose } from 'react-apollo'
import {MainApi, MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name} from '../../../views/Api/';
import ReactQuill from "react-quill";
import Dropzone from 'react-dropzone'
import request from 'superagent';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Loader from 'halogen/ScaleLoader'
import {Image} from 'cloudinary-react';
import DatePicker from 'react-datepicker';
import momentx from 'moment';

import Moment from 'react-moment';
import 'moment/locale/id';
import IntlCurrencyInput from "react-intl-currency-input"
import 'react-datepicker/dist/react-datepicker.css';
import formatMoney from 'accounting-js/lib/formatMoney.js'

const history = createBrowserHistory();

const userId = window.localStorage.getItem("x");

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

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


class EditInvoice extends Component {

  static propTypes = {
    router: PropTypes.object,
    updateInvoice: PropTypes.func,
    //refresh: PropTypes.func,
  }

 //defaultValue = 10000;

  constructor(props) {
    super(props)
    this.state = { 
    id: '',
    description: '',
    title: '',
    price: '',
    status: '',
    rating:'',
    dueDate:'',
    imageUrl: '',
    imageId: '',
    startDate: momentx(),
    valuex: this.defaultValue,
    maskedValue: "IDR10000",
    member: userId,
    uploadedFile: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangex = this.handleChangex.bind(this);
     this.handleChangeIdr = this.handleChangeIdr.bind(this);
      this.onUpdatePress = this.onUpdatePress.bind(this);
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
 
  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Invoice($id: ID!) {
              Invoice(id: $id){
              id
              title
              status
              rating
              status
              dueDate
              description
              price
              imageUrl
              imageId
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
              data : results.data.Invoice,
              id:results.data.Invoice.id,
              title:results.data.Invoice.title,
              price:results.data.Invoice.price,
              description:results.data.Invoice.description,
              dueDate:results.data.Invoice.dueDate,
              rating:results.data.Invoice.rating,
              status:results.data.Invoice.status,
              imageId:results.data.Invoice.imageId,
              imageUrl:results.data.Invoice.imageUrl,
              loading:false
             });
            //...
          })

  }

  onUpdatePress() {

     //var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateInvoice ($id: ID!, $rating: Int, $status: Int, $title: String!, $description: String, $valuex: Float, $imageId: String!,  $imageUrl: String!, $startDate: String!, $member: ID!){
              updateInvoice (
                  id: $id, 
                  title: $title, 
                  price: $valuex,
                  dueDate: $startDate,
                  status:$status,
                  rating:$rating,
                  description: $description, 
                  imageId: $imageId, 
                  imageUrl: $imageUrl, 
                  userId: $member
                  ){
                id
                       
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            title: this.state.title,
            valuex: this.state.valuex,
            startDate: this.state.startDate,
            description: this.state.description,
            member: this.state.member,
            status: parseInt(this.state.status),
            rating: parseInt(this.state.rating),
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

            window.location= MainLink + "invoice/all";
            window.location.reload(true);
            //...
          })


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
    if (this.state.loading) {
      return (<div><Loader color="#26A65B" size="12px" margin="4px"/></div>)
    }

     var money = formatMoney(this.state.price, { symbol: "Rp. ", precision: 2, thousand: ".", decimal: "," });
     var defaultValue = this.state.price;
     var startDate = this.state.dueDate;
    
    return (

          <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Edit </strong> 
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
                        defaultValue={defaultValue}
                        onChange={this.handleChangeIdr}
                        autoFocus={false}
                        autoSelect={false}
                         className="form-control"
                />
                     
                    </div>
                  </div>
                 <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Due Date Invoice</label>
                    <div className="col-md-9">
                    <strong>
                      <Moment locale="id" format="LL">
                           {this.state.dueDate}
                        </Moment>
                     </strong>
          
                 
                    </div>
                  </div>
                 <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Change Due Date Invoice</label>
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
                    <label className="col-md-3 form-control-label" htmlFor="select">Status Invoice</label>
                    <div className="col-md-9">
                      
                      <select id="select" value={this.state.status}  name="status" className="form-control" onChange={(e) => this.setState({status: e.target.value})}>
                        
                      <option value="0">Pending</option>
                      <option value="1">Accept</option>
                      <option value="2">Cancel</option>
                      </select>
                      
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Rating Invoice</label>
                    <div className="col-md-9">
                      
                      <select id="select" value={this.state.rating}  name="rating" className="form-control" onChange={(e) => this.setState({rating: e.target.value})}>
                        
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      </select>
                      
                    </div>
                  </div>
                 
                  
                     <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="file-input">Upload Invoice</label>
                    <div className="col-md-9">
                     <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone><br/>
           {this.state.imageUrl === '' ? null :
          
               <a href={`${this.state.imageUrl}`} ><i style={{fontSize:30}} className="fa fa-file-text-o"></i></a>
          }
          
                    </div>
                  </div>
                 
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/invoice/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditInvoice;


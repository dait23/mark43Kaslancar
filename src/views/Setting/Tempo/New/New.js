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

class NewTempo extends Component {

  static propTypes = {
    router: PropTypes.object,
    addTempo: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    name: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  

  handleChange(value) {
    this.setState({ description: value })
  }


  


  render() {
    const { content } = this.state
    return (
      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New Invoice Tempo
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Jumlah Hari</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Isi Dengan Angka Aja , Contoh 10 Hari"
                      onChange={(e) => this.setState({name: e.target.value})}
                    
                      />
                    </div>
                  </div>
              
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/tempo/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const {name} = this.state
    await this.props.addTempo({variables: {name}})

   //history.push('#/slider/all');
   //history.goBack;
   window.location= MainLink + "setting/tempo/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addTempo($name: String!) {
    createTempo(name: $name) {
      id
      name
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addTempo' })(NewTempo)

export default withRouter(PageWithMutation)

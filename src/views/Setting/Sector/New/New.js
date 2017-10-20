import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql, gql } from 'react-apollo'
import Dropzone from 'react-dropzone'
import request from 'superagent';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import {MainLink} from '../../../../views/Api/';
import {Image} from 'cloudinary-react';
const history = createBrowserHistory();


class NewSector extends Component {

  static propTypes = {
    router: PropTypes.object,
    addSector: PropTypes.func,
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
                <strong>Add </strong> New Sector
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Title</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Title"
                      onChange={(e) => this.setState({name: e.target.value})}
                    
                      />
                    </div>
                  </div>
              
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/sector/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const {name} = this.state
    await this.props.addSector({variables: {name}})

   //history.push('#/slider/all');
   //history.goBack;
   window.location= MainLink + "setting/sector/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addSector($name: String!) {
    createSector(name: $name) {
      id
      name
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addSector' })(NewSector)

export default withRouter(PageWithMutation)

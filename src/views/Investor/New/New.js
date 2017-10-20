import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql, gql, compose } from 'react-apollo'
import request from 'superagent';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Loader from 'halogen/ScaleLoader';
import {Image} from 'cloudinary-react';
import {MainLink} from '../../../views/Api/';
const history = createBrowserHistory();


class NewCustomer extends Component {

  static propTypes = {
    router: PropTypes.object,
    data: PropTypes.object,
    addCustomer: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
      firstName:'',
      lastName:'',
      password: '',
      name: '',
      email: '',
      imageId: '',
      emailSubscription: false,
    }
    //this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

   componentDidMount() {
       this.forceUpdate();
  }

  
  

  render() {

    const { content } = this.state
 

    return (
      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New Investor
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">First Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.firstName} name="firstName" className="form-control" placeholder="First Name"
                       onChange={(e) => this.setState({firstName: e.target.value})}
                      />
                    </div>
                  </div>

                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Last Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.LastName} name="lastName" className="form-control" placeholder="Last Name"
                       onChange={(e) => this.setState({lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Email</label>
                    <div className="col-md-9">
                      <input type="email" id="text-input" value={this.state.email} name="email" className="form-control" placeholder="Email"
                       onChange={(e) => this.setState({email: e.target.value})}
                      />
                    </div>
                  </div>
                 <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Password</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.password} name="password" className="form-control" placeholder="Password"
                       onChange={(e) => this.setState({password: e.target.value})}
                      />
                    </div>
                  </div>

                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/customer/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }
  
  handlePost = async () => {
    //this.setState({slug: slug, imageId})
    const {firstName, lastName, email, password, emailSubscription, imageId} = this.state
    await this.props.addUser({variables: {email, password, firstName, lastName, emailSubscription, imageId}})

   //history.push('#/slider/all');
   window.location= MainLink + "investor/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addUser($email: String!, $firstName: String!, $lastName: String!, $password: String!, $emailSubscription: Boolean!, $imageId: String) {
    createUser(
      authProvider: {email: {email: $email, password: $password}},
      name: $firstName, 
      emailSubscription: $emailSubscription,
      investor:{
        firstName: $firstName
        lastName: $lastName
        imageId: $imageId
      }
    ){
    id
    }
  }
`

//const PageWithMutation = graphql( addMutation, { name: 'addBlog' })(NewBlog)
//const ListPageWithData = graphql(FeedQuery)
//export default withRouter(PageWithMutation)

export default compose(
  //graphql(FeedQuery),
  graphql(addMutation, { name: 'addUser' }),
)(NewCustomer)

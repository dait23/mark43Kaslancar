import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { graphql, gql } from 'react-apollo'
import PropTypes from 'prop-types';


class Login extends Component {


  static propTypes = {
    router: PropTypes.object.isRequired,
    signinUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = {
    email: '',
    password: '',
  }



  render() {

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in
    if (this.props.data.user) {
      console.warn('already logged in')
      //window.location.replace('/');
    }

    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div className="card-block">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to Admin account</p>
                   <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="icon-user"></i></span>
                      <input type="text" className="form-control" value={this.state.email} placeholder="Email" onChange={(e) => this.setState({email: e.target.value})} />
                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input type="password" className="form-control" placeholder="Password"  value={this.state.password}  onChange={(e) => this.setState({password: e.target.value})}/>
                    </div>
                    <div className="row">
                      <div className="col-6">
                      {this.state.email && this.state.password &&
                        <button type="button" className="btn btn-primary px-4"  onClick={this.signinUser}>Login</button>
                       }
                      </div>
                      <div className="col-6 text-right">
                        
                      </div>
                    </div>
                  </div>
                </div>
                 <div className="card card-inverse" style={{ width: 44 + '%' }}>
                <img src="img/login.jpg" className="img-responsive" alt="" />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
signinUser = () => {
    const {email, password} = this.state

    this.props.signinUser({variables: {email, password}})
      .then((response) => {
        window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
        console.log(response);
        //this.props.router.replace('/')
         window.location.reload()
      }).catch((e) => {
        console.error(e)
        //this.props.router.replace('/')
        window.location.reload()
      })
  }
}

const signinUser = gql`
  mutation ($email: String!, $password: String!) { 
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
      role
    }
  }
`

export default graphql(signinUser, {name: 'signinUser'})(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(withRouter(Login))
)


//export default Login;

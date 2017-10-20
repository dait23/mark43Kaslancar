import React from 'react'
import { graphql, gql } from 'react-apollo'
import {withRouter } from 'react-router-dom'
import Loader from 'halogen/PulseLoader'
import PropTypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//import { withRouter } from 'react-router'
//import ListPage from './ListPage'
//import NewPostLink from './NewPostLink'

// Containers
import Full from './containers/Full/'

// Views
import Login from './views/Pages/Login/'
// Views
import Register from './views/Pages/Register/'

class App extends React.Component {
  static propTypes = {
    //router: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      danger: true,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDanger= this.toggleDanger.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  toggleDanger() {
    this.setState({
      danger: !this.state.danger
    });
  }


  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('graphcoolToken')
    window.location.reload()
  }

  _showLogin = () => {
    this.props.router.push('/login')
  }

  _showSignup = () => {
    this.props.router.push('/signup')
  }

  _isLoggedIn = () => {
    return this.props.data.user
    var x = this.props.data.user.id
    localStorage.setItem('x', x)
    console.log(x);
  
  }

  _isAdmin = () =>{


  return this.props.data.user.role

  }

  render () {
     var style = {
             display: '-webkit-flex',
            display: 'flex',     
            alignItems: 'center',
            minHeight: '30em',
            justifyContent: 'center'
        };
    if (this.props.data.loading) {
      return (
          <div style={{
               flex: '1',
                maxWidth: '100%'
            }}>
        <div style={style}><Loader color="#26A65B" size="16px" margin="4px"/></div>
        </div>
        )
    }

    if (this._isLoggedIn() && this.props.data.user.role == 'Admin') {
       return this.renderLoggedIn()
     
      //return this.props.router.push('/dashboard')
       //return this.props.router.replace('/dashboard')
      // window.location.replace('#/dashboard');
    } 
    if (this._isLoggedIn() && this.props.data.user.role == 'Standard') {
       return this.renderWarning()
     
      //return this.props.router.push('/dashboard')
       //return this.props.router.replace('/dashboard')
      // window.location.replace('#/dashboard');
    } else {
      return this.renderLoggedOut()
    }
  }

  renderLoggedIn() {

    var x = this.props.data.user.id
       localStorage.setItem('x', x)
       console.log(x);
  
    return (
      <div>
          <Full />
      </div>
    )
  }
  
  renderWarning(){

    return(
      <div>
          <Modal isOpen={this.state.danger} toggle={this.toggleDanger} className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Alert</ModalHeader>
                  <ModalBody>
                   Anda Bukan Administrator....!
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggleDanger}>Close</Button>
                  </ModalFooter>
                </Modal>


                 <Login />

      </div>
    )
  }
  renderLoggedOut() {
    return (
      <div>
        <Login />
      </div>
    )
  }
}

const userQuery = gql`
  query {
    user {
      id
      name
      role
    }
  }
`

export default graphql(userQuery, { options: {fetchPolicy: 'network-only'}})(withRouter(App))

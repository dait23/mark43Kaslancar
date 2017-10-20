import React from 'react'
import { graphql, gql } from 'react-apollo'
import {withRouter } from 'react-router-dom'
import Loader from 'halogen/PulseLoader'
import PropTypes from 'prop-types';

//import { withRouter } from 'react-router'
//import ListPage from './ListPage'
//import NewPostLink from './NewPostLink'

// Containers
import Full from './Full'

// Views
import Login from '../../views/Pages/Login/'
// Views
//import Register from './views/Pages/Register/'

class App extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
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

    if (this._isLoggedIn()) {
       return this.renderLoggedIn()
      //return this.props.router.push('/dashboard')
       //return this.props.router.replace('/dashboard')
      // window.location.replace('#/dashboard');
    } else {
      return this.renderLoggedOut()
    }
  }

  renderLoggedIn() {
    return (
      <div>
        <Full />
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
    }
  }
`

export default graphql(userQuery, { options: {fetchPolicy: 'network-only'}})(withRouter(App))

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav'
import LandingPage from './Containers/LandingPage'
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import UserProfile from './Containers/UserProfile'
import Game from './Containers/Game';
import Stage from './Containers/Stage'
import './App.css';
import { connect } from 'react-redux'

class App extends React.Component {

  logOut = () => {
    localStorage.removeItem("token")
    this.props.setCurrentUser({currentUser: null})
    this.props.history.push('/login')
  }

  componentDidMount() {
    const token = localStorage.getItem("token")

    if (token) {
      fetch("http://localhost:3001/auto_login", {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then((response) => {
        this.props.setCurrentUser(response)
      })
    }
  }

  // setCurrentUser = (response) => {
  //   this.setState({
  //     currentUser: response.user
  //   }, () => {
  //     localStorage.setItem("token", response.token)
  //     this.props.history.push(`/game`)
  //   })
  // }

  render () {
    return (
      <div>
        <Nav logOut={this.logOut}/>
        <Switch>
          <Route path="/login" component={ LoginForm } />
          <Route path="/signup" component={ SignupForm } />
          <Route path="/user" component={ UserProfile } />
          <Route path="/stage" component={ Stage } />
          <Route path="/game" component={ Game }/>
          <Route path="/" component={ LandingPage } />
          }
        </Switch>
      </div>
    )
  }


}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => {
      // dispatch is our new setState and it takes an object with a type and a payload
      dispatch({type: "SET_CURRENT_USER", payload: user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

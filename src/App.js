import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav'
import LandingPage from './Containers/LandingPage'
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import UserProfile from './Containers/UserProfile'
import Game from './Containers/Game';
import './App.css';

class App extends React.Component {

  state = {
    currentUser: null
  }

  logOut = () => {
    localStorage.removeItem("token")
    this.setState({
      currentUser: null
    }, () => {
      this.props.history.push('/login')
    })
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
        this.setState({
          currentUser: response
        })
      })
    }
  }

  setCurrentUser = (response) => {
    this.setState({
      currentUser: response.user
    }, () => {
      localStorage.setItem("token", response.token)
      this.props.history.push(`/game`)
    })
  }

  render () {
    return (
      <div>
        <Nav currentUser={this.state.currentUser} logOut={this.logOut}/>
        <Switch>
          <Route path="/login" render={(routeProps) => <LoginForm {...routeProps} setCurrentUser={this.setCurrentUser}/>} />
          <Route path="/signup" render={(routeProps) => <SignupForm {...routeProps} setCurrentUser={this.setCurrentUser}/>} />
          <Route path="/user" render={(routeProps) => <UserProfile {...routeProps} currentUser={this.state.currentUser}/>} />
          {this.state.currentUser ?
            <Route path="/game" render={(routeProps) => <Game {...routeProps} currentUser={this.state.currentUser}/>}/>
            :
            <Route path="/" render={(routeProps) => <LandingPage {...routeProps} currentUser={this.state.currentUser}/>} />
          }
        </Switch>
      </div>
    )
  }
}

export default App;

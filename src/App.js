import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './Components/Nav'
import LandingPage from './Components/LandingPage'
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import Game from './Components/Game';
import './App.css';

class App extends React.Component {

  state = {
    currentUser: null
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
        <Nav />
        <Switch>
          <Route path="/login" render={(routeProps) => <LoginForm {...routeProps} setCurrentUser={this.setCurrentUser}/>} />
          <Route path="/signup" render={(routeProps) => <SignupForm {...routeProps} setCurrentUser={this.setCurrentUser}/>} />
          <Route path="/game" component={Game}/>
          <Route path="/" render={(routeProps) => <LandingPage {...routeProps} />} />
        </Switch>
      </div>
    )
  }
}

export default App;

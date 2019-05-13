import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
    const userID = localStorage.getItem("user_id")

    if (userID) {
      fetch("http://localhost:3001/auto_login", {
        headers: {
          "Authorization": userID
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

  setCurrentUser = (user) => {
    this.setState({
      currentUser: user
    }, () => {
      localStorage.setItem("user_id", this.state.currentUser.id)
      this.props.history.push(`/game`)
    })
  }

  render () {
    console.log(this.state);
    return (
      <Switch>
        <Route path="/login" render={(routeProps) => <LoginForm {...routeProps} setCurrentUser={this.setCurrentUser}/>} />
        <Route path="/signup" render={(routeProps) => <SignupForm {...routeProps} setCurrentUser={this.setCurrentUser}/>} />
        <Route path="/game" component={Game}/>
        <Route path="/" render={(routeProps) => <LandingPage {...routeProps} />} />
      </Switch>
    )
  }
}

export default App;

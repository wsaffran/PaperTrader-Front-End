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

  setCurrentUser = (user) => {
    console.log(this.props.history);
    this.setState({
      currentUser: user
    }, () => {
      this.props.history.push(`/game`)
    })
  }

  render () {
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

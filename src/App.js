import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import Nav from './Components/Nav'
import LandingPage from './Containers/LandingPage'
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import UserProfile from './Containers/UserProfile'
import Game from './Containers/Game';
import Stage from './Containers/Stage';
import FindGameComponent from './Components/FindGameComponent'
import CreateGameForm from './Components/CreateGameForm'
import YourGameComponent from './Components/YourGameComponent'
import OtherGamePlayerStage from './Containers/OtherGamePlayerStage'
import Loading from './Components/Loading'



import './App.css';
// import history from './history';


class App extends React.Component {

  logOut = () => {
    localStorage.removeItem("token")
    this.props.setCurrentUser({currentUser: null})
    this.props.history.push('/')
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

  render () {
    return (
      <div>
        {/*<Router history={history}>*/}
        <Nav logOut={this.logOut}/>
        <Switch>
          <Route path="/login" component={ LoginForm } />
          <Route path="/signup" component={ SignupForm } />
          <Route path="/user" component={ UserProfile } />
          <Route path="/stage/:currentGameId" render={ (routeProps) => {
              return <Stage {...routeProps} activeItem={routeProps.match.params.currentGameId}/>
            }
          }/>
          <Route path='/game_player/:game_player_id' render={ (routeProps) => {
              return <OtherGamePlayerStage {...routeProps} activeItem={routeProps.match.params.currentGameId}/>
            }
          } />
        <Route path ='/loading' component={ Loading } />


          <Route exact path="/" component={ LandingPage } />
        </Switch>
        <Route path="/game" component={ Game }/>
        <Route path="/game/your" component={ YourGameComponent }/>
        <Route path="/game/find" component={ FindGameComponent }/>
        <Route path="/game/create" component={ CreateGameForm }/>
        {/*</Router>*/}
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

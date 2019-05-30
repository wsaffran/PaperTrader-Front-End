import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import Nav from './Components/Nav'
import LandingPage from './Containers/LandingPage'
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
// import UserProfile from './Containers/UserProfile'
import Game from './Containers/Game';
import Stage from './Containers/Stage';
// import FindGameComponent from './Components/FindGameComponent'
// import CreateGameForm from './Components/CreateGameForm'
// import YourGameComponent from './Components/YourGameComponent'
import OtherGamePlayerStage from './Containers/OtherGamePlayerStage'
import Overview from './Components/Overview'
// import YourProfile from './Components/YourProfile'
import Rankings from './Components/Rankings'
import YourPortfolio from './Components/YourPortfolio'
import GameInfo from './Components/GameInfo'
import Transactions from './Components/Transactions'


import Loading from './Components/Loading'
import Loading1 from './Components/Loading1'

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

          <Route exact path='/game_player/:game_player_id' render={ (routeProps) => {
                return <OtherGamePlayerStage {...routeProps} activeItem={routeProps.match.params.currentGameId}/>
              }
            } />

          <Route path ='/loading' component={ Loading } />
          <Route path ='/loading1' component={ Loading1 } />
          <Route exact path="/game" component={ Game }/>


          <Route exact path="/" component={ LandingPage } />
        </Switch>
        <Route path="/stage/:currentGameId/" render={ (routeProps) => {
            return <Stage {...routeProps} activeItem={routeProps.match.params.currentGameId}/>
          }
        }/>
        <Route path="/stage/:currentGameId/overview" render={ (routeProps) => {
            return <Overview {...routeProps} activeItem={routeProps.match.params.currentGameId}/>
          }
        }/>
        <Route path="/stage/:currentGameId/portfolio" render={ (routeProps) => {
            return <YourPortfolio {...routeProps} activeItem={routeProps.match.params.currentGameId}/>
          }
        }/>
        <Route path="/stage/:currentGameId/rankings" render={ (routeProps) => {
            return <Rankings {...routeProps} activeItem={routeProps.match.params.currentGameId}/>
          }
        }/>
      <Route path="/stage/:currentGameId/transactions" render={ (routeProps) => {
            return <Transactions {...routeProps} activeItem={routeProps.match.params.currentGameId}/>
          }
        }/>
        <Route path="/stage/:currentGameId/game-info" render={ (routeProps) => {
            return <GameInfo {...routeProps} activeItem={routeProps.match.params.currentGameId}/>
          }
        }/>
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

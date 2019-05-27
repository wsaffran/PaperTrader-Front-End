import React from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import YourProfile from '../Components/YourProfile'
import Rankings from '../Components/Rankings'

// import { Link } from 'react-router-dom';
// import CreateGameForm from '../Components/CreateGameForm'
// import v4 from 'uuid'

class Overview extends React.Component {

  componentDidMount() {
    fetch(`http://localhost:3001/game_players/${localStorage.getItem('currentGamePlayer')}`)
    .then(res => res.json())
    .then(res => {
      this.props.setCurrentGamePlayer(res)
    }, () => {
      fetch(`http://localhost:3001/portfolio/${localStorage.getItem('currentGamePlayer')}`)
      .then(res => res.json())
      .then(res => {
        this.props.setPortfolio(res)
      })
    })
  }

  render() {
    return (
      <Container>
        {this.props.currentUser && this.props.currentGamePlayer ?
          <Container>
            <YourProfile history={this.props.history}/>
            <Rankings history={this.props.history}/>
          </Container>
        :
          null
        }
      </Container>
    )
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentGamePlayer: state.currentGamePlayer,
    // currentGame: state.currentGame,
    // games: state.games,
    // users: state.users,
    // gamePlayers: state.gamePlayers,
    activeItem: state.activeItem
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPortfolio: (portfolio) => {
      dispatch({type: "SET_PORTFOLIO", payload: portfolio})
    },
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
    },
    setCurrentGamePlayer: (game_player) => {
      dispatch({type: "SET_CURRENT_GAME_PLAYER", payload: game_player})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)

import React from 'react'
import { connect } from 'react-redux'
// import Search from '../Components/Search'
import Search from '../Components/Search'
import YourProfile from '../Components/YourProfile'
import YourPortfolio from '../Components/YourPortfolio'
import PortfolioPerformance from '../Components/PortfolioPerformance'
import YourTransactions from '../Components/YourTransactions'

class Stage extends React.Component {

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
        this.props.setCurrentGameId(this.props.match.params.currentGameId)
        this.props.setCurrentGame(this.props.currentUser.games.find(game => game.id === parseInt(this.props.match.params.currentGameId)))
        this.props.setCurrentGamePlayer(this.props.currentUser.game_players.find(gameplayer => gameplayer.game.id === parseInt(this.props.match.params.currentGameId)))
      })
    }

  }

  render() {
    return (
      <div>
        {(this.props.currentUser && this.props.currentGamePlayer) ?
          <div>
            <h1>Stage</h1>
            <Search />
            <YourProfile />
            <YourPortfolio />
            <PortfolioPerformance />
            <YourTransactions />
          </div>
         : null }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentGameId: state.currentGameId,
    currentGamePlayer: state.currentGamePlayer
    // currentGame: state.currentGame,
    // games: state.games,
    // users: state.users,
    // gamePlayers: state.gamePlayers,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentGameId: (gameId) => {
      dispatch({type: "SET_CURRENT_GAME_ID", payload: gameId})
    },
    setCurrentGame: (game) => {
      dispatch({type: "SET_CURRENT_GAME", payload: game})
    },
    setCurrentGamePlayer: (game_player) => {
      dispatch({type: "SET_CURRENT_GAME_PLAYER", payload: game_player})
    },
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)

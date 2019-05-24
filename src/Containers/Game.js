import React from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom';
// import CreateGameForm from '../Components/CreateGameForm'
// import v4 from 'uuid'

class Game extends React.Component {

  componentDidMount() {
    fetch('http://localhost:3001/games')
    .then(res => res.json())
    .then(response => {
      this.props.setGames(response)
    }, () => {
      fetch('http://localhost:3001/game_players')
      .then(res => res.json())
      .then(response => {
        this.props.setGamePlayers(response)
      }, () => {

        fetch('http://localhost:3001/users')
        .then(res => res.json())
        .then(response => {
          this.props.setUsers(response)
        })
      })
    })
  }

  handleItemClick = (e, { name }) => {
    this.props.updateActiveItem(name)
    if (name === 'yourGames') {
      this.props.history.push('/game/your')
    } else if (name === 'findGame') {
      this.props.history.push('/game/find')
    } else if (name === 'createGame') {
      this.props.history.push('/game/create')
    }
  }

  render() {
    console.log(this.props);
    const { activeItem } = this.props
    return (
      <div>
        <Menu secondary pointing>
          <Menu.Item name="yourGames" active={activeItem === 'yourGames'} onClick={this.handleItemClick}>
            Your Games
          </Menu.Item>

          <Menu.Item name="findGame" active={activeItem === 'findGame'} onClick={this.handleItemClick}>
            Find Game
          </Menu.Item>

          <Menu.Item name="createGame" active={activeItem === 'createGame'} onClick={this.handleItemClick}>
            Create Game
          </Menu.Item>
        </Menu>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    // currentGame: state.currentGame,
    // games: state.games,
    // users: state.users,
    // gamePlayers: state.gamePlayers,
    activeItem: state.activeItem
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setGames: (games) => {
      dispatch({type: "SET_GAMES", payload: games})
    },
    setGamePlayers: (gamePlayers) => {
      dispatch({type: "SET_GAME_PLAYERS", payload: gamePlayers})
    },
    setUsers: (users) => {
      dispatch({type: "SET_USERS", payload: users})
    },
    // setCurrentGame: (game) => {
    //   dispatch({type: "SET_CURRENT_GAME", payload: game})
    // },
    // setCurrentGamePlayer: (gamePlayer) => {
    //   dispatch({type: "SET_CURRENT_GAME_PLAYER", payload: gamePlayer})
    // },
    // setCurrentUser: (user) => {
    //   dispatch({type: "SET_CURRENT_USER", payload: user})
    // },
    // updateGamePlayers: (gamePlayer) => {
    //   dispatch({type: "UPDATE_GAME_PLAYERS", payload: gamePlayer})
    // },
    updateActiveItem: (activeItem) => {
      dispatch({type: "UPDATE_ACTIVE_ITEM", payload: activeItem})
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)

import React from 'react'
import { Link } from 'react-router-dom';
import { Table, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import v4 from 'uuid'

class YourGameComponent extends React.Component {

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


  getYourGameRows = () => {
    if (this.props.currentUser.games) {
      return this.props.currentUser.games.map(game => {
        return (
          // <Link className="item" to="/stage">
          <Table.Row key={v4()} onClick={() => this.handleGameClick(game)}>
            <Table.Cell>{game.name}</Table.Cell>
            <Table.Cell>0.98%</Table.Cell>
            <Table.Cell>$556.90</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>07/10/19</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>
              <Link to={`/stage/${game.id}`}>
                <button onClick={() => this.handleGameClick(game)}>
                  View Game
                </button>
              </Link>
            </Table.Cell>
          </Table.Row>
          // </Link>
        )
      })
    }
  }

  handleGameClick = (game) => {
    this.props.setCurrentGameId(game.id)
    this.props.setCurrentGame(game)
    this.props.setCurrentGamePlayer(this.props.currentUser.game_players.find(g => g.game.id === game.id))
    // set Current Game_Player too?
    // this.props.history.push('/stage')
  }


  render() {
    return (
      <Container>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Today's Returns</Table.HeaderCell>
              <Table.HeaderCell>Total Returns</Table.HeaderCell>
              <Table.HeaderCell>Rank</Table.HeaderCell>
              <Table.HeaderCell>End</Table.HeaderCell>
              <Table.HeaderCell>Number of Players</Table.HeaderCell>
              <Table.HeaderCell>Enter Game</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.currentUser ? this.getYourGameRows() : null}
          </Table.Body>
        </Table>
      </Container>
    )
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentGame: state.currentGame,
    games: state.games,
    users: state.users,
    gamePlayers: state.gamePlayers,
    currentGameId: state.currentGameId
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
    setCurrentGame: (game) => {
      dispatch({type: "SET_CURRENT_GAME", payload: game})
    },
    setCurrentGamePlayer: (gamePlayer) => {
      dispatch({type: "SET_CURRENT_GAME_PLAYER", payload: gamePlayer})
    },
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
    },
    updateGamePlayers: (gamePlayer) => {
      dispatch({type: "UPDATE_GAME_PLAYERS", payload: gamePlayer})
    },
    updateActiveItem: (activeItem) => {
      dispatch({type: "UPDATE_ACTIVE_ITEM", payload: activeItem})
    },
    setCurrentGameId: (gameId) => {
      dispatch({type: "SET_CURRENT_GAME_ID", payload: gameId})
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourGameComponent)

import React from 'react'
import { Link } from 'react-router-dom';
import { Table, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
// import v4 from 'uuid'

class FindGameComponent extends React.Component {

  getRows = () => {
    return this.props.games.map(game => {
      return (
        <Table.Row key={game.id}>
          <Table.Cell>{game.name}</Table.Cell>
          <Table.Cell>{game.starting_balance}</Table.Cell>
          <Table.Cell>{game.start_date}</Table.Cell>
          <Table.Cell>{game.end_date}</Table.Cell>
          <Table.Cell>{game.game_players.length}</Table.Cell>
          {
            (this.props.currentUser.games && this.props.currentUser.games.find(userGame => userGame.id === game.id)) ?
            <Table.Cell>Already Joined!</Table.Cell>
            :
            <Table.Cell>
              <Link to="/game/your">
                <button onClick={() => this.handleClick(game)}>
                  Join Game {game.name}
                </button>
              </Link>
            </Table.Cell>
          }
        </Table.Row>
      )
    })
  }

  handleClick = (game) => {
    fetch('http://localhost:3001/join_game', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify({user_id: this.props.currentUser.id, game_id: game.id, cash_balance: game.starting_balance})
    })
    .then(res => res.json())
    .then(response => {
      this.props.updateGamePlayers(response)
      const token = localStorage.getItem("token")     // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES

      if (token) {                                    // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
        fetch("http://localhost:3001/auto_login", {   // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
          headers: {                                  // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
            "Authorization": token                    // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
          }
        })
        .then(res => res.json())                      // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
        .then((response) => {                         // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
          this.props.setCurrentUser(response)         // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
        })
      }
      this.props.updateActiveItem('yourGames')
      this.props.history.push('/game')
      // }
      // this.props.history.push('/game')
      // this.props.setCurrentGamePlayer(this.props.currentUser.game_players.find(g => g.game.id === game.id))
    })
  }

  render() {
    return (
      <Container>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Starting Balance</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Number of Players</Table.HeaderCell>
              <Table.HeaderCell>Join Game</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.currentUser ? this.getRows() : null}
          </Table.Body>
        </Table>
      </Container>
    )
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    games: state.games
    // currentGame: state.currentGame,
    // users: state.users,
    // gamePlayers: state.gamePlayers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // setGames: (games) => {
    //   dispatch({type: "SET_GAMES", payload: games})
    // },
    // setGamePlayers: (gamePlayers) => {
    //   dispatch({type: "SET_GAME_PLAYERS", payload: gamePlayers})
    // },
    // setUsers: (users) => {
    //   dispatch({type: "SET_USERS", payload: users})
    // },
    // setCurrentGame: (game) => {
    //   dispatch({type: "SET_CURRENT_GAME", payload: game})
    // },
    // setCurrentGamePlayer: (gamePlayer) => {
    //   dispatch({type: "SET_CURRENT_GAME_PLAYER", payload: gamePlayer})
    // },
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
    },
    updateGamePlayers: (gamePlayer) => {
      dispatch({type: "UPDATE_GAME_PLAYERS", payload: gamePlayer})
    },
    updateActiveItem: (activeItem) => {
      dispatch({type: "UPDATE_ACTIVE_ITEM", payload: activeItem})
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindGameComponent)

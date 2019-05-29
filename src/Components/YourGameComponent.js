import React from 'react'
import { Link } from 'react-router-dom';
import { Table, Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import v4 from 'uuid'

class YourGameComponent extends React.Component {

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

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(0)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  dateFormat = (date) => {
    let newDate = date.split('-')
    let showDate = `${newDate[1]}/${newDate[2]}/${newDate[0]}`
    return showDate

  }

  getYourGameRows = () => {
    if (this.props.currentUser.games) {
      return this.props.currentUser.games.map(game => {
        return (
          // <Link className="item" to="/stage">
          <Table.Row key={v4()} onClick={() => this.handleGameClick(game)}>
            <Table.Cell>{game.name}</Table.Cell>
            <Table.Cell>${this.numberWithCommas(game.starting_balance)}</Table.Cell>
            <Table.Cell>{this.dateFormat(game.start_date)}</Table.Cell>
            <Table.Cell>{this.dateFormat(game.end_date)}</Table.Cell>
            <Table.Cell>{game.game_players.length}</Table.Cell>
            <Table.Cell>
              <Link to={`/stage/${game.id}/overview`}>
                <Button onClick={() => this.handleGameClick(game)}>
                  View Game
                </Button>
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
    localStorage.setItem("currentGamePlayer", `${this.props.currentUser.game_players.find(g => g.game.id === game.id).id}`)
    // set Current Game_Player too?
    // this.props.history.push('/stage')
  }


  render() {
    return (
      <Container style={{padding: "30px"}}>
        <h1>YOUR GAMES</h1>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Starting Balance</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Players</Table.HeaderCell>
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
    currentGamePlayer: state.currentGamePlayer
    // currentGame: state.currentGame,
    // games: state.games,
    // users: state.users,
    // gamePlayers: state.gamePlayers,
    // currentGameId: state.currentGameId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentGame: (game) => {
      dispatch({type: "SET_CURRENT_GAME", payload: game})
    },
    setCurrentGamePlayer: (gamePlayer) => {
      dispatch({type: "SET_CURRENT_GAME_PLAYER", payload: gamePlayer})
    },
    setCurrentGameId: (gameId) => {
      dispatch({type: "SET_CURRENT_GAME_ID", payload: gameId})
    },
    // setGames: (games) => {
    //   dispatch({type: "SET_GAMES", payload: games})
    // },
    // setGamePlayers: (gamePlayers) => {
    //   dispatch({type: "SET_GAME_PLAYERS", payload: gamePlayers})
    // },
    // setUsers: (users) => {
    //   dispatch({type: "SET_USERS", payload: users})
    // },
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
    }
    // updateGamePlayers: (gamePlayer) => {
    //   dispatch({type: "UPDATE_GAME_PLAYERS", payload: gamePlayer})
    // },
    // updateActiveItem: (activeItem) => {
    //   dispatch({type: "UPDATE_ACTIVE_ITEM", payload: activeItem})
    // },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourGameComponent)

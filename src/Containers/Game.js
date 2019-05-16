import React from 'react'
// import { Link } from 'react-router-dom';
import CreateGameForm from '../Components/CreateGameForm'
import { Tab, Table, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import v4 from 'uuid'

class Game extends React.Component {

  state = {
    // selected: 'yourGames',
  }

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

  // YOUR GAMES
  renderYourGamesContent = () => {
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
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.getYourGameRows()}
          </Table.Body>
        </Table>
      </Container>
    )
  }

  getYourGameRows = () => {
    if (this.props.currentUser && this.props.currentUser.games) {
      return this.props.currentUser.games.map(game => {
        return (
          // <Link className="item" to="/stage">
          <Table.Row key={v4()} onClick={() => this.handleGameClick(game)}>
            <Table.Cell>{game.name}</Table.Cell>
            <Table.Cell>0.98%</Table.Cell>
            <Table.Cell>$556.90</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>07/10/19</Table.Cell>
            <Table.Cell>23</Table.Cell>
          </Table.Row>
          // </Link>
        )
      })
    }
  }

  handleGameClick = (game) => {
    this.props.setCurrentGame(game)
    this.props.history.push('/stage')
  }

  // FIND GAMES
  renderFindGamesContent = () => {
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
            {this.getRows()}
          </Table.Body>
        </Table>
      </Container>
    )
  }

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
            (this.props.currentUser.games && this.props.currentUser.games.includes(game)) ?
            <Table.Cell><button name='join' id={game.id} onClick={this.handleClick}>Join</button></Table.Cell>
            :
            <Table.Cell>Already Joined!</Table.Cell>
          }
        </Table.Row>
      )
    })
  }

  handleClick = (event) => {

    // this.props.currentUser.game_players.map(game_player => {
    //   if (game_player.includes(event))
    // })
    //
    // if (this.props.currentUser.game_players.includes(event.target.id))
    //
    fetch('http://localhost:3001/join_game', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify({user_id: this.props.currentUser.id, game_id: parseInt(event.target.id)})
    })
    .then(res => res.json())
    .then(response => {
      this.props.history.push('/stage')
    })
  }

  // CREATE GAME
  renderCreateGameContent = () => {
    return (
      <div>
        <h1>Create a Game!!!</h1>
        <CreateGameForm />
      </div>
    )
  }

  // Tabs
  renderPanes = () => {
    return (
      [
        { menuItem: 'Your Games', render: () => <Tab.Pane attached={false} name="yourGames">{this.renderYourGamesContent()}</Tab.Pane> }, // HERE PUT HISTORY.PUSH to correct route?
        { menuItem: 'Find Game', render: () => <Tab.Pane attached={false} name="findGames">{this.renderFindGamesContent()}</Tab.Pane> },
        { menuItem: 'Create Game', render: () => <Tab.Pane attached={false} name="createGame">{this.renderCreateGameContent()}</Tab.Pane> },
      ]
    )
  }

  render() {
    console.log(this.props);
    return (
      <Tab menu={{ secondary: true, pointing: true}} panes={this.renderPanes()} />
    )
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentGame: state.currentGame,
    games: state.games,
    users: state.users,
    gamePlayers: state.gamePlayers
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)

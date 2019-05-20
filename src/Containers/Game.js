import React from 'react'
import { Link } from 'react-router-dom';
import CreateGameForm from '../Components/CreateGameForm'
import { Table, Container, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import v4 from 'uuid'

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
              <Link to="/stage">
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
    this.props.setCurrentGame(game)
    this.props.setCurrentGamePlayer(this.props.currentUser.game_players.find(g => g.game.id === game.id))
    // set Current Game_Player too?
    // this.props.history.push('/stage')
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
      console.log(game);
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
              <Link to="/game">
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
    console.log(game); // GAME IS NOT COMING THROUGH
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
      // this.props.history.push('/game')
      // }
      // this.props.history.push('/game')
      // this.props.setCurrentGamePlayer(this.props.currentUser.game_players.find(g => g.game.id === game.id))
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

  // <Link to="/game">
  //   <button onClick={() => this.handleClick(game)}>
  //     Join Game {game.name}
  //   </button>
  // </Link>

  // Tabs
  renderPanes = () => {
    return (
      {/*[

        { menuItem: 'Your Games', render: () => <Tab.Pane attached={false} name="yourGames">{this.renderYourGamesContent()}</Tab.Pane> }, // HERE PUT HISTORY.PUSH to correct route?
        { menuItem: 'Find Game', render: () =>
            <Tab.Pane attached={false} name="findGames">
              <FindGameComponent />
            </Tab.Pane>},
        { menuItem: 'Create Game', render: () => <Tab.Pane attached={false} name="createGame">{this.renderCreateGameContent()}</Tab.Pane> },
      ]*/}
    )
  }

  handleItemClick = (e, { name }) => this.props.updateActiveItem(name) //this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.props
    return (
      <>
      {/*<Tab menu={{ secondary: true, pointing: true}} panes={this.renderPanes()} />*/}

      <div>
        <Menu secondary pointing>
          <Link to="/game/your">
            <Menu.Item name="yourGames" active={activeItem === 'yourGames'} onClick={this.handleItemClick}>
              Your Games
            </Menu.Item>
          </Link>

          <Link to="/game/find">
            <Menu.Item name="findGame" active={activeItem === 'findGame'} onClick={this.handleItemClick}>
              Find Game
            </Menu.Item>
          </Link>

          <Link to="/game/create">
            <Menu.Item name="createGame" active={activeItem === 'createGame'} onClick={this.handleItemClick}>
              Create Game
            </Menu.Item>
          </Link>
        </Menu>
      </div>
      </>

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
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)

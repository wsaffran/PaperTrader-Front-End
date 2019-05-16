import React from 'react'
import { Link } from 'react-router-dom';
import CreateGameForm from '../Components/CreateGameForm'
import { Tab, Table, Container } from 'semantic-ui-react'
// import v4 from 'uuid'

class Game extends React.Component {

  state = {
    selected: 'yourGames',
    games: [],
    game_players: [],
    users: []
  }

  componentDidMount() {
    fetch('http://localhost:3001/games')
    .then(res => res.json())
    .then(response => {
      this.setState({
        games: response
      })
    })
    fetch('http://localhost:3001/game_players')
    .then(res => res.json())
    .then(res => {
      this.setState({
        game_players: res
      })
    })
    fetch('http://localhost:3001/users')
    .then(res => res.json())
    .then(res => {
      this.setState({
        users: res
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
    if (this.state.game_players) {

      return this.props.currentUser.games.map(game => {
        return (
          <Link onClick={this.handleGameClick} className="item" to="/stage">
            <Table.Row key={game.id}>
              <Table.Cell>{game.name}</Table.Cell>
              <Table.Cell>0.98%</Table.Cell>
              <Table.Cell>$556.90</Table.Cell>
              <Table.Cell>3</Table.Cell>
              <Table.Cell>07/10/19</Table.Cell>
              <Table.Cell>23</Table.Cell>
            </Table.Row>
          </Link>
        )
      })
    }
  }

  handleGameClick = () => {
    this.handleClick({
      ...this.state.games, selected: true
    })
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
    return this.state.games.map(game => {
      return (
        <Table.Row key={game.id}>
          <Table.Cell>{game.name}</Table.Cell>
          <Table.Cell>{game.starting_balance}</Table.Cell>
          <Table.Cell>{game.start_date}</Table.Cell>
          <Table.Cell>{game.end_date}</Table.Cell>
          <Table.Cell>num of players</Table.Cell>
          <Table.Cell><button name='join' id={game.id} onClick={this.handleClick}>Join</button></Table.Cell>
        </Table.Row>
      )
    })
  }

  handleClick = (event) => {
    console.log(this.props.currentUser.id, parseInt(event.target.id));
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
        { menuItem: 'Your Games', render: () => <Tab.Pane attached={false} name="yourGames">{this.renderYourGamesContent()}</Tab.Pane> },
        { menuItem: 'Find Game', render: () => <Tab.Pane attached={false} name="findGames">{this.renderFindGamesContent()}</Tab.Pane> },
        { menuItem: 'Create Game', render: () => <Tab.Pane attached={false} name="createGame">{this.renderCreateGameContent()}</Tab.Pane> },
      ]
    )
  }

  render () {
    console.log(this.state);
    return (
      <h1>Game Page</h1>
    )
  }
}

export default Game

// <Tab menu={{ secondary: true, pointing: true}} panes={this.renderPanes()} />

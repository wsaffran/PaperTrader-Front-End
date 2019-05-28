import React from 'react'
import { Grid, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import YourGameComponent from '../Components/YourGameComponent'
import FindGameComponent from '../Components/FindGameComponent'
import CreateGameForm from '../Components/CreateGameForm'
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
    // const { activeItem } = this.props
    return (
      <Container fluid>
        <Grid fluid>
          <Grid.Row columns={2}>
            <Grid.Column width={11}>
              <Grid.Row>
                <YourGameComponent history={this.props.history}/>
              </Grid.Row>
              <Grid.Row>
                <FindGameComponent history={this.props.history}/>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={5}>
              <CreateGameForm history={this.props.history}/>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Container>
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

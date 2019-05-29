import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { Container, Card, List, Image } from 'semantic-ui-react'
// import v4 from 'uuid'

class GameInfo extends React.Component {

  componentDidMount() {
    console.log(this.props.match.params.currentGameId);
    fetch(`http://localhost:3001/game_players/${localStorage.getItem('currentGamePlayer')}`)
    .then(res => res.json())
    .then(res => {
      this.props.setCurrentGamePlayer(res)
    })
    fetch('http://localhost:3001/game_players')
    .then(res => res.json())
    .then(response => {
      this.props.setGamePlayers(response)
    })
  }

  renderUsers = () => {
    return this.props.gamePlayers.map(player => {
      if (player.game.id === parseInt(this.props.match.params.currentGameId)) {
        return (
          <List.Item>
            Players
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
            <List.Content>
              <List.Header as='a'>{player.user.username}</List.Header>
            </List.Content>
          </List.Item>
        )
      } else {
        return null
      }
    })
  }

  renderGameInfo = () => {
    return (
      <Container>
        <h2>{this.props.currentGamePlayer.game.name}</h2>
        <List horizontal relaxed='very'>
          {this.renderUsers()}
        </List>
      </Container>
    )
  }

  render () {
    console.log(this.props.gamePlayers);
    return (
      <Container >
      {this.props.currentGamePlayer && this.props.gamePlayers ?
        <Card className="fluid">
          <Card.Content header='GAME INFO' style={{backgroundColor: 'lightgray'}}/>
          <Card.Content description={this.renderGameInfo()} />
        </Card>
        :
        null
      }

      </Container >
    )
  }

}

function mapStateToProps(state) {
  return {
    currentGamePlayer: state.currentGamePlayer,
    portfolio: state.portfolio,
    currentUser: state.currentUser,
    rankings: state.rankings,
    game: state.currentGame,
    gamePlayers: state.gamePlayers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPortfolio: (portfolio) => {
      dispatch({type: "SET_PORTFOLIO", payload: portfolio})
    },
    updatePortfolio: (portfolio) => {
      dispatch({type: "UPDATE_PORTFOLIO", payload: portfolio})
    },
    setCurrentGamePlayer: (game_player) => {
      dispatch({type: "SET_CURRENT_GAME_PLAYER", payload: game_player})
    },
    setGame: (game) => {
      dispatch({type: "SET_CURRENT_GAME", payload: game})
    },
    setGamePlayers: (game_players) => {
      dispatch({type: "SET_GAME_PLAYERS", payload: game_players})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GameInfo)

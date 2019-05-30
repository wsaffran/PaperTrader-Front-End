import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { Container, Card, List, Image } from 'semantic-ui-react'
import v4 from 'uuid'

class GameInfo extends React.Component {

  numberWithCommas = (x, y) => {
    const floatNum = parseFloat(x).toFixed(y)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  state = {
    stats: []
  }


  componentDidMount() {
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
    // fetch(`http://localhost:3001/stats/${this.props.match.params.currentGameId}`)
    // .then(res => res.json())
    // .then(console.log)
  }

  renderUsers = () => {
    return this.props.gamePlayers.map(player => {
      if (player.game.id === parseInt(this.props.match.params.currentGameId)) {
        return (
          <List.Item key={v4()}>
            <Image style={{width: '50px', height: '50px'}} avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
            <List.Content>
              <List.Header>{player.user.username}</List.Header>
              <List.Description>${this.numberWithCommas(player.cash_balance, 0)} buying power</List.Description>
              {player.transactions.length > 1 ?
                <List.Description>{player.transactions.length} transactions</List.Description>
                :
                <List.Description>{player.transactions.length} transaction</List.Description>
              }
              {player.user.games.length > 1 ?
                <List.Description>{player.user.games.length} active games</List.Description>
                :
                <List.Description>{player.user.games.length} active game</List.Description>
              }
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
        <h1>{this.props.currentGamePlayer.game.name}</h1>
        <List horizontal relaxed='very'>
          <h2>Players</h2>
          {this.renderUsers()}
        </List>
      </Container>
    )
  }

  renderStats = () => {
    return (
      <Container>
        <h2>Stats</h2>
        <List horizontal>
          <List.Item>
            <List.Header>Starting Cash</List.Header>
            ${this.numberWithCommas(this.props.currentGamePlayer.game.starting_balance, 2)}
          </List.Item>
          <List.Item>
            <List.Header>Starting Date</List.Header>
            {this.props.currentGamePlayer.game.start_date}
          </List.Item>
          <List.Item>
            <List.Header>End Date</List.Header>
            {this.props.currentGamePlayer.game.end_date}
          </List.Item>
        </List>
      </Container>
    )
  }

  render () {
    return (
      <Container >
      {this.props.currentGamePlayer && this.props.gamePlayers ?
        <Card className="fluid">
          <Card.Content header='GAME INFO' style={{backgroundColor: 'lightgray'}}/>
          <Card.Content description={this.renderGameInfo()} />
          <Card.Content description={this.renderStats()} />
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

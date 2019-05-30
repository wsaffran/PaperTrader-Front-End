import React from 'react'
import { connect } from 'react-redux'
import { Container, Menu } from 'semantic-ui-react'
// import Search from '../Components/Search'
// import Search from '../Components/Search'
// import YourProfile from '../Components/YourProfile'
// import YourPortfolio from '../Components/YourPortfolio'
// import Rankings from '../Components/Rankings'
// import YourTransactions from '../Components/YourTransactions'

class Stage extends React.Component {

  state = { activeItem: `${this.props.history.location.pathname.split('/').slice(-1).join()}`}

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
        this.props.setCurrentGameId(this.props.match.params.currentGameId)
        // console.log(this.props.match.params.currentGameId);
        // console.log(response.game_players.find(gp => gp.game.id));
        // this.props.setCurrentGamePlayer(response.game_players.find(game_player => game_player.game.id === this.props.currentGameId))
        // this.props.setCurrentGame(this.props.currentUser.games.find(game => game.id === parseInt(this.props.match.params.currentGameId)))
      })
      fetch(`http://localhost:3001/games/${this.props.match.params.currentGameId}/rankings`)
      .then(res => res.json())
      .then(res => {
        this.props.setRankings(res)
      })
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name }, () => {
      const { activeItem } = this.state
      if (activeItem === 'overview') {
        this.props.history.push(`/stage/${this.props.currentGameId}/overview`)
      } else if (activeItem === 'portfolio') {
        this.props.history.push(`/stage/${this.props.currentGameId}/portfolio`)
      } else if (activeItem === 'rankings') {
        this.props.history.push(`/stage/${this.props.currentGameId}/rankings`)
      } else if (activeItem === 'gameInfo') {
        this.props.history.push(`/stage/${this.props.currentGameId}/game-info`)
      } else if (activeItem === 'transactionHistory') {
        this.props.history.push(`/stage/${this.props.currentGameId}/transactions`)
      }
    })
  }

  render() {
    const { activeItem } = this.state
    return (
      <Container style={{padding: '10px'}}>
        {(this.props.currentUser && this.props.currentGamePlayer) ?
          <Menu widths={5}>
            <Menu.Item
              name='overview'
              active={activeItem === 'overview'}
              onClick={this.handleItemClick}
            >
              Overview
            </Menu.Item>

            <Menu.Item
              name='portfolio'
              active={activeItem === 'portfolio'}
              onClick={this.handleItemClick}
            >
              Portfolio
            </Menu.Item>

            <Menu.Item
              name='rankings'
              active={activeItem === 'rankings'}
              onClick={this.handleItemClick}
            >
              Rankings
            </Menu.Item>

            <Menu.Item
              name='transactionHistory'
              active={activeItem === 'transactionHistory'}
              onClick={this.handleItemClick}
            >
              Transactions
            </Menu.Item>

            <Menu.Item
              name='gameInfo'
              active={activeItem === 'gameInfo'}
              onClick={this.handleItemClick}
            >
              Game Info
            </Menu.Item>
          </Menu>
         : null }
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentGameId: state.currentGameId,
    currentGamePlayer: state.currentGamePlayer
    // currentGame: state.currentGame,
    // games: state.games,
    // users: state.users,
    // gamePlayers: state.gamePlayers,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentGameId: (gameId) => {
      dispatch({type: "SET_CURRENT_GAME_ID", payload: gameId})
    },
    setCurrentGame: (game) => {
      dispatch({type: "SET_CURRENT_GAME", payload: game})
    },
    setCurrentGamePlayer: (game_player) => {
      dispatch({type: "SET_CURRENT_GAME_PLAYER", payload: game_player})
    },
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
    },
    setPortfolio: (portfolio) => {
      dispatch({type: "SET_PORTFOLIO", payload: portfolio})
    },
    setRankings: (rankings) => {
      dispatch({type: "SET_RANKINGS", payload: rankings})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)



// <div>
//   <div className='row' style={{height: "auto", textAlign: "center"}}>
//     <YourProfile />
//   </div>
//   <div className='row' style={{height: "auto", textAlign: "center"}}>
//     <Search history={this.props.history} />
//   </div>
//   <div className='row' style={{height: "auto", textAlign: "center"}}>
//     <YourPortfolio />
//   </div>
//   <div className='row' style={{height: "auto", textAlign: "center"}}>
//     <Rankings history={this.props.history}/>
//   </div>
//   <div className='row' style={{height: "auto", textAlign: "center"}}>
//     <YourTransactions />
//   </div>
// </div>

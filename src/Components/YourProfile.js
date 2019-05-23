import React from 'react'
import { connect } from 'react-redux'

class YourProfile extends React.Component {

  state ={
    rankings: []
  }

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(2)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  componentDidMount() {
    fetch(`http://localhost:3001/games/${this.props.currentGame.id}/rankings`)
    .then(res => res.json())
    .then(res => {
      this.setState({rankings: res})
    })
  }

  getRanking = () => {
    if (this.state.rankings.length > 0 && this.props.currentGamePlayer) {
      let ranking = this.state.rankings.find(ranking => ranking.game_player_id === this.props.currentGamePlayer.id)
      return (
        <div>
          <p>{this.props.currentUser.username}</p>
          <p>ranking: {this.numberWithCommas(ranking.ranking)}</p>
          <p>Net Worth: ${this.numberWithCommas(ranking.current_value)}</p>
          <p>Overall Gains: ${this.numberWithCommas(ranking.returns)}</p>
          <p>Overall Returns: {this.numberWithCommas(ranking.percent_gain)}%</p>
          <p>Cash Remaining: </p>
          <p>Buying Power: </p>
        </div>
      )
    } else {
      return null
    }
  }

  render () {
    return (
      <div>
        <h3>YourProfile</h3>
        {this.getRanking()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    portfolio: state.portfolio,
    currentGamePlayer: state.currentGamePlayer,
    currentGame: state.currentGame
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateRankings: (rankings) => {
      dispatch({type: "UPDATE_RANKINGS", payload: rankings})
    },
    setRankings: (rankings) => {
      dispatch({type: "SET_RANKINGS", payload: rankings})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourProfile)

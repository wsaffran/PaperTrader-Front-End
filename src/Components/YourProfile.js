import React from 'react'
import { connect } from 'react-redux'
import { Container, Grid } from 'semantic-ui-react'


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
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <h3>{this.props.currentUser.username}</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <p>ranking: {this.numberWithCommas(ranking.ranking)}</p>
            </Grid.Column>
            <Grid.Column>
              <p>Net Worth: ${this.numberWithCommas(ranking.current_value)}</p>
            </Grid.Column>
            <Grid.Column>
              <p>Overall Gains: ${this.numberWithCommas(ranking.returns)}</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <p>Overall Returns: {this.numberWithCommas(ranking.percent_gain)}%</p>
            </Grid.Column>
            <Grid.Column>
              <p>Cash Remaining: </p>
            </Grid.Column>
            <Grid.Column>
              <p>Buying Power: </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    } else {
      return null
    }
  }

  render () {
    return (
      <Container>
        {this.props.portfolio && this.props.currentGamePlayer ?
          <div>
            <h1>YourProfile</h1>
            {this.getRanking()}
          </div>
        :
          null
        }
      </Container>
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

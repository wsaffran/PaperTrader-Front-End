import React from 'react'
import { connect } from 'react-redux'
import { Table, Container, Loader } from 'semantic-ui-react'
import v4 from 'uuid'


class Rankings extends React.Component {

  state = {
    rankings: [],
    isLoading: true
  }

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(2)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  componentDidMount() {
    fetch(`http://localhost:3001/game_players/${localStorage.getItem('currentGamePlayer')}`)
    .then(res => res.json())
    .then(res => {
      this.props.setCurrentGamePlayer(res)
    })
    fetch(`http://localhost:3001/games/${this.props.match.params.currentGameId}/rankings`)
    .then(res => res.json())
    .then(res => {
      this.setState({rankings: res, isLoading: false})
    })
  }

  handleClick = (id) => {
    this.props.history.push(`/game_player/${id}`)
  }

  renderRankings = () => {
    return this.state.rankings.map(ranking => {
      if (ranking.game_player_id === this.props.currentGamePlayer.id) {
        return (
          <Table.Row style={{backgroundColor: "lightblue"}} key={v4()} value={ranking.game_player_id} onClick={() => this.handleClick(ranking.game_player_id)}>
            <Table.Cell>#{ranking.ranking}</Table.Cell>
            <Table.Cell>{ranking.username}</Table.Cell>
            <Table.Cell>${this.numberWithCommas(ranking.starting_balance)}</Table.Cell>
            <Table.Cell>${this.numberWithCommas(ranking.current_value)}</Table.Cell>
            <Table.Cell>${this.numberWithCommas(ranking.returns)}</Table.Cell>
            <Table.Cell>{this.numberWithCommas(ranking.percent_gain)}%</Table.Cell>
          </Table.Row>
        )
      } else {
        return (
          <Table.Row key={v4()} value={ranking.game_player_id} onClick={() => this.handleClick(ranking.game_player_id)}>
            <Table.Cell>#{ranking.ranking}</Table.Cell>
            <Table.Cell>{ranking.username}</Table.Cell>
            <Table.Cell>${this.numberWithCommas(ranking.starting_balance)}</Table.Cell>
            <Table.Cell>${this.numberWithCommas(ranking.current_value)}</Table.Cell>
            <Table.Cell>${this.numberWithCommas(ranking.returns)}</Table.Cell>
            <Table.Cell>{this.numberWithCommas(ranking.percent_gain)}%</Table.Cell>
          </Table.Row>
        )
      }
    })
  }

  render () {
    return (
      <div>
        <h1>Rankings</h1>
        <Container>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Rank</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Starting Balance</Table.HeaderCell>
                <Table.HeaderCell>Current Value</Table.HeaderCell>
                <Table.HeaderCell>Total Return</Table.HeaderCell>
                <Table.HeaderCell>Percent Gain</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {this.state.isLoading ?
              <Table.Body>
                <Table.Row>
                  <Table.HeaderCell colSpan={16} style={{padding: '10px'}} >
                    <Loader active inline='centered' />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Body>
              :
              <Table.Body>
                {this.props.currentGamePlayer ? this.renderRankings() : null}
              </Table.Body>
            }
          </Table>
        </Container>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    currentGamePlayer: state.currentGamePlayer,
    portfolio: state.portfolio,
    currentUser: state.currentUser,
    game: state.currentGame
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rankings)

import React from 'react'
import { connect } from 'react-redux'
import { Table, Container } from 'semantic-ui-react'
import v4 from 'uuid'


class Rankings extends React.Component {

  state = {
    rankings: []
  }

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(2)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  componentDidMount() {
    fetch(`http://localhost:3001/games/${this.props.game.id}/rankings`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({rankings: res})
    })
  }

  renderRankings = () => {
    return this.state.rankings.map(ranking => {
      return (
        <Table.Row key={v4()}>
          <Table.Cell>#{ranking.ranking}</Table.Cell>
          <Table.Cell>{ranking.username}</Table.Cell>
          <Table.Cell>${this.numberWithCommas(ranking.starting_balance)}</Table.Cell>
          <Table.Cell>${this.numberWithCommas(ranking.current_value)}</Table.Cell>
          <Table.Cell>${this.numberWithCommas(ranking.returns)}</Table.Cell>
          <Table.Cell>{this.numberWithCommas(ranking.percent_gain)}%</Table.Cell>
        </Table.Row>
      )
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

            <Table.Body>
              {this.props.currentGamePlayer ? this.renderRankings() : null}
            </Table.Body>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rankings)

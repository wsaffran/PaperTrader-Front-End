import React from 'react'
import { connect } from 'react-redux'
import { Table, Container } from 'semantic-ui-react'
import v4 from 'uuid'

class OtherGamePlayerStage extends React.Component {

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(2)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  state = {
    currentGamePlayer: null,
    portfolio: []
  }

  componentDidMount = () => {
    fetch(`http://localhost:3001/game_players/${this.props.match.params.game_player_id}`)
    .then(res => res.json())
    .then(res => {
      const game_player = res
      fetch(`http://localhost:3001/portfolio/${this.props.match.params.game_player_id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          gamePlayer: game_player,
          portfolio: res
        })
      })
    })
  }

  getCurrentCashValue = () => {
    const starting_cash = this.state.gamePlayer.cash_balance
    const transactions = this.state.gamePlayer.transactions

    let total_cost = 0
    transactions.map(transaction => {
      return total_cost += transaction.price * transaction.current_shares
    })

    let total_value = 0.00

    this.state.portfolio.map(holding => {
      total_value += holding.current_value
      return null
    })
    // Issue here with calculating cash_balance... should I update cash balance every transaction instead???
    // Wait! is this actually and issue???
    const current_cash_value = starting_cash - total_cost
    return (
      <Table.Row key={v4()}>
        <Table.Cell>CASH</Table.Cell>
        <Table.Cell>{this.numberWithCommas(current_cash_value)}</Table.Cell>
        <Table.Cell>$1.00</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>$1.00</Table.Cell>
        <Table.Cell>${this.numberWithCommas(current_cash_value)}</Table.Cell>
        <Table.Cell>{/*${this.numberWithCommas(current_cash_value)}*/}</Table.Cell>
        <Table.Cell>{this.numberWithCommas(current_cash_value / (total_value + current_cash_value) * 100)}%</Table.Cell>
      </Table.Row>
    )
  }

  printCurrentCashValue = () => {
    const starting_cash = this.state.gamePlayer.cash_balance
    const transactions = this.state.gamePlayer.transactions

    let total_cost = 0
    transactions.map(transaction => {
      return total_cost += transaction.price * transaction.current_shares
    })

    const current_cash_value = starting_cash - total_cost
    return current_cash_value
  }

  orderedPortfolio = () => {
    return this.state.portfolio.sort(function(a, b) {
      let textA = a.ticker.toUpperCase();
      let textB = b.ticker.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  getPortfolio = () => {
    let total_value = 0
    this.orderedPortfolio().map(holding => {
      total_value += holding.current_value
      return null
    })

    total_value += this.printCurrentCashValue()

    return this.state.portfolio.map(holding => {
      return (
        <Table.Row key={v4()}>
          <Table.Cell>{holding.ticker}</Table.Cell>
          <Table.Cell>{holding.total_shares}</Table.Cell>
          <Table.Cell>${this.numberWithCommas(holding.current_stock_price)}</Table.Cell>
          <Table.Cell>TBD</Table.Cell>
          <Table.Cell>${this.numberWithCommas(holding.value_gain)}</Table.Cell>
          <Table.Cell>{this.numberWithCommas((holding.current_value - holding.total_cost) / holding.total_cost * 100)}%</Table.Cell>
          <Table.Cell>${this.numberWithCommas(holding.cost_basis)}</Table.Cell>
          <Table.Cell>${this.numberWithCommas(holding.current_value)}</Table.Cell>
          <Table.Cell>${this.numberWithCommas(holding.total_cost)}</Table.Cell>
          <Table.Cell>{this.numberWithCommas(holding.current_value / total_value * 100)}%</Table.Cell>
        </Table.Row>
      )
    })
  }

  getTotals = () => {

    let total_cost = 0.00
    let total_gain = 0.00
    let total_value = 0.00

    this.state.portfolio.map(holding => {
      total_cost += holding.total_cost
      total_gain += holding.value_gain
      total_value += holding.current_value
      return null
    })

    return (
      <Table.Row key={v4()}>
        <Table.Cell>Total</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>TBD</Table.Cell>
        <Table.Cell>${this.numberWithCommas(total_gain)}</Table.Cell>
        <Table.Cell>{ this.numberWithCommas(( (total_value + this.printCurrentCashValue()) - (total_cost + this.printCurrentCashValue()) ) / (total_cost + this.printCurrentCashValue()) * 100) }%</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>${this.numberWithCommas(total_value + this.printCurrentCashValue())}</Table.Cell>
        <Table.Cell>{/*${this.numberWithCommas(total_cost + this.printCurrentCashValue())}*/}</Table.Cell>
        <Table.Cell>100%</Table.Cell>
      </Table.Row>
    )
  }

  render () {
    return (
      <div>
      {this.state.portfolio && this.state.gamePlayer ?
          <div>
            <h1>{this.state.gamePlayer.user.username.charAt(0).toUpperCase() + this.state.gamePlayer.user.username.slice(1)}'s Portfolio</h1>
            <Container>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Symbol</Table.HeaderCell>
                    <Table.HeaderCell>Shares</Table.HeaderCell>
                    <Table.HeaderCell>Current Price</Table.HeaderCell>
                    <Table.HeaderCell>Today's Gain/Loss</Table.HeaderCell>
                    <Table.HeaderCell>Total Gain/Loss</Table.HeaderCell>
                    <Table.HeaderCell>Percent Gain/Loss</Table.HeaderCell>
                    <Table.HeaderCell>Cost Basis</Table.HeaderCell>
                    <Table.HeaderCell>Current Value</Table.HeaderCell>
                    <Table.HeaderCell>Total Cost</Table.HeaderCell>
                    <Table.HeaderCell>% of Portfolio</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.gamePlayer ? this.getPortfolio() : null}
                  {this.state.gamePlayer ? this.getCurrentCashValue() : null}
                  {this.state.gamePlayer ? this.getTotals() : null}
                </Table.Body>
              </Table>
            </Container>
          </div>
        :
          null
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentGamePlayer: state.currentGamePlayer,
    portfolio: state.portfolio
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


export default connect(mapStateToProps, mapDispatchToProps)(OtherGamePlayerStage)

import React from 'react'
import { connect } from 'react-redux'
import { Table, Container } from 'semantic-ui-react'
import v4 from 'uuid'

class YourPortfolio extends React.Component {

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(2)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  componentDidMount = () => {

    const transactions = this.props.currentGamePlayer.transactions
    const distinctTickers = [...new Set(transactions.map(x => x.symbol))]

    // Make ordered array of all transactions
    let orderedTransactions = []
    for (let i = 0; i < distinctTickers.length; i++) {
      transactions.map(transaction => {
        if (transaction.symbol === distinctTickers[i]) {
          return orderedTransactions.push(transaction)
        } else {
          return null
        }
      })
    }

    fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${distinctTickers.join(',')}&types=quote`)
    .then(res => res.json())
    .then(res => {

      let new_array = []
      for (let i = 0; i < distinctTickers.length; i++) {
        let total_cost = 0
        let total_shares = 0
        orderedTransactions.map(transaction => {
          if (transaction.symbol === distinctTickers[i]) {
            total_shares += Number.parseFloat(transaction.shares)
            total_cost += Number.parseFloat(transaction.price * transaction.shares)
            return null
          } else {
            return null
          }
        })

        new_array.push({
          ticker: distinctTickers[i],
          total_cost: total_cost,
          total_shares: total_shares,
          cost_basis: total_cost / total_shares,
          current_stock_price: res[distinctTickers[i]].quote.latestPrice,
          value_gain: Number.parseFloat(res[distinctTickers[i]].quote.latestPrice * total_shares - total_cost),
          current_value: total_shares * res[distinctTickers[i]].quote.latestPrice
        })
      }

      this.props.setPortfolio(new_array)
    })

  }

  getCurrentCashValue = () => {
    const starting_cash = this.props.currentGamePlayer.cash_balance
    const transactions = this.props.currentGamePlayer.transactions

    let total_cost = 0
    transactions.map(transaction => {
      return total_cost += transaction.price * transaction.shares
    })

    let total_value = 0.00

    this.props.portfolio.map(holding => {
      total_value += holding.current_value
      return null
    })

    const current_cash_value = starting_cash - total_cost
    return (
      <Table.Row key={v4()}>
        <Table.Cell>CASH</Table.Cell>
        <Table.Cell>{this.numberWithCommas(current_cash_value)}</Table.Cell>
        <Table.Cell>$1.00</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>$1.00</Table.Cell>
        <Table.Cell>${this.numberWithCommas(current_cash_value)}</Table.Cell>
        <Table.Cell>${this.numberWithCommas(current_cash_value)}</Table.Cell>
        <Table.Cell>{this.numberWithCommas(current_cash_value / (total_value + current_cash_value) * 100)}%</Table.Cell>
      </Table.Row>
    )
  }

  printCurrentCashValue = () => {
    const starting_cash = this.props.currentGamePlayer.cash_balance
    const transactions = this.props.currentGamePlayer.transactions

    let total_cost = 0
    transactions.map(transaction => {
      return total_cost += transaction.price * transaction.shares
    })

    const current_cash_value = starting_cash - total_cost
    return current_cash_value
  }

  getPortfolio = () => {
    let total_value = 0
    this.props.portfolio.map(holding => {
      total_value += holding.current_value
      return null
    })

    total_value += this.printCurrentCashValue()

    return this.props.portfolio.map(holding => {
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

    this.props.portfolio.map(holding => {
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
        <Table.Cell>${this.numberWithCommas(total_cost + this.printCurrentCashValue())}</Table.Cell>
        <Table.Cell>100%</Table.Cell>
      </Table.Row>
    )
  }

  render () {
    return (
      <div>
        <h3>Your Portfolio</h3>
        {this.props.portfolio ?
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
                {this.props.currentGamePlayer ? this.getPortfolio() : null}
                {this.props.currentGamePlayer ? this.getCurrentCashValue() : null}
                {this.props.currentGamePlayer ? this.getTotals() : null}
              </Table.Body>
            </Table>
          </Container>
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


export default connect(mapStateToProps, mapDispatchToProps)(YourPortfolio)

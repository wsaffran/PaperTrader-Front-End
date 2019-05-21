import React from 'react'
import { connect } from 'react-redux'
import v4 from 'uuid'

class YourPortfolio extends React.Component {

  getCurrentCashValue = () => {
    const starting_cash = this.props.currentGamePlayer.cash_balance
    const transactions = this.props.currentGamePlayer.transactions

    let total_cost = 0
    transactions.map(transaction => {
      return total_cost += transaction.price * transaction.shares
    })

    const current_cash_value = starting_cash - total_cost
    return current_cash_value
  }

  // componentDidMount = () => {
  //   const transactions = this.props.currentGamePlayer.transactions
  //   const distinctTickers = [...new Set(transactions.map(x => x.symbol))]
  //
  //   // Make ordered array of all transactions
  //   let orderedTransactions = []
  //   for (let i = 0; i < distinctTickers.length; i++) {
  //     transactions.map(transaction => {
  //       if (transaction.symbol === distinctTickers[i]) {
  //         return orderedTransactions.push(transaction)
  //       } else {
  //         return null
  //       }
  //     })
  //   }
  //
  //   // Make array of ticker with its total shares owned and total cost to own
  //   let new_array = []
  //   for (let i = 0; i < distinctTickers.length; i++) {
  //     let total_cost = 0
  //     let total_shares = 0
  //     orderedTransactions.map(transaction => {
  //       if (transaction.symbol === distinctTickers[i]) {
  //         total_shares += transaction.shares
  //         total_cost += transaction.price * transaction.shares
  //         return null
  //       } else {
  //         return null
  //       }
  //     })
  //
  //     new_array.push({
  //       ticker: distinctTickers[i],
  //       total_cost: total_cost,
  //       total_shares: total_shares,
  //       cost_basis: total_cost / total_shares
  //     })
  //   }
  //
  //   // Return new array
  //   console.log(new_array);
  //   return new_array.map(item => `${item.total_shares} ${item.ticker} shares costed $${item.total_cost}. `)
  // }

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
            total_shares += transaction.shares
            total_cost += transaction.price * transaction.shares
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
          value_gain: res[distinctTickers[i]].quote.latestPrice * total_shares - total_cost
        })
      }

      this.props.setPortfolio(new_array)
    })

  }


  getPortfolio = () => {
    return this.props.portfolio.map(holding => {
      return (
        <div key={v4()}>
          <p>ticker: {holding.ticker}</p>
          <p>total shares: {holding.total_shares}</p>
          <p>current stock price: {holding.current_stock_price}</p>
          <p>gain/loss: {holding.value_gain}</p>
          <p>cost basis / share: {holding.cost_basis}</p>
          <p>total cost: {holding.total_cost}</p>
        </div>
      )
    })
  }



  render () {
    return (
      <div>
        {this.props.portfolio ?
          <div>
            <h3>YourPortfolio</h3>
            <p>Cash: ${this.getCurrentCashValue()}</p>
            {this.getPortfolio()}
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


export default connect(mapStateToProps, mapDispatchToProps)(YourPortfolio)

import React from 'react'
import { connect } from 'react-redux'

class YourProfile extends React.Component {

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(2)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  printCurrentCashValue = () => {
    const starting_cash = this.props.currentGamePlayer.cash_balance
    const transactions = this.props.currentGamePlayer.transactions

    let total_cost = 0
    transactions.map(transaction => {
      return total_cost += transaction.price * transaction.current_shares
    })

    const current_cash_value = starting_cash - total_cost
    return current_cash_value
  }

  getTotals = (type) => {
    let total_cost = 0.00
    let total_gain = 0.00
    let total_value = 0.00

    this.props.portfolio.map(holding => {
      total_cost += holding.total_cost
      total_gain += holding.value_gain
      total_value += holding.current_value
      return null
    })

    if (type === 'percent gain') {

      return this.numberWithCommas(( (total_value + this.printCurrentCashValue()) - (total_cost + this.printCurrentCashValue()) ) / (total_cost + this.printCurrentCashValue()) * 100)
    } else if (type === 'value gain') {
      return this.numberWithCommas(total_gain)
    }
  }

  componentDidMount = () => {
    this.props.currentGame.game_players.forEach(game_player => {
      fetch(`http://localhost:3001/game_players/${game_player.id}`)
      .then(res => res.json())
      .then(res => {
        const transactions = res.transactions
        const distinctTickers = [...new Set(transactions.map(x => x.symbol))]
        let rankings = []

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
                total_shares += Number.parseFloat(transaction.current_shares)
                total_cost += Number.parseFloat(transaction.price * transaction.current_shares)
                return null
              } else {
                return null
              }
            })

            if(total_shares === 0) {
              // Removes Items That Dont Exist
            } else {

              new_array.push({
                game_player_id: game_player.id,
                ticker: distinctTickers[i],
                total_cost: total_cost,
                total_shares: total_shares,
                cost_basis: total_cost / total_shares,
                current_stock_price: res[distinctTickers[i]].quote.latestPrice,
                value_gain: Number.parseFloat(res[distinctTickers[i]].quote.latestPrice * total_shares - total_cost),
                current_value: total_shares * res[distinctTickers[i]].quote.latestPrice
              })
            }
          }

          let total_cost = 0.00
          let total_gain = 0.00
          let total_value = 0.00

          this.props.portfolio.map(holding => {
            total_cost += holding.total_cost
            total_gain += holding.value_gain
            total_value += holding.current_value
            return null
          })

          let current_cash_value = game_player.cash_balance - total_cost // cash in account

          // console.log("dollar gain", total_gain);
          // console.log("total value", total_value + current_cash_value);
          let percent_gain = ( (total_value + current_cash_value) - (total_cost + current_cash_value) ) / (total_cost + current_cash_value) * 100

          let totals = {
            game_player_id: game_player.id,
            value: total_value + current_cash_value,
            value_gain: total_gain,
            percent_gain: percent_gain

          }

          rankings.push(totals)
          console.log(rankings);
          this.props.updateRankings(rankings)

        })
      })
    })
  }

  render () {
    return (
      <div>
        <h3>YourProfile</h3>
        {this.props.portfolio ?
          <div>
            <p>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</p>
            <p>Ranking: </p>
            <p>% Gain: {this.getTotals('percent gain')}</p>
            <p>$ Gain: {this.getTotals('value gain')}</p>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourProfile)

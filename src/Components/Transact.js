import React from 'react';
import { connect } from 'react-redux'
// import history from '../history';
// import './Modal.css';
// import Autocomplete from "./Autocomplete.jsx";
// import Research from './Research'
// import Graph from './Graph'

import { Button, Icon, Modal } from 'semantic-ui-react'

class Transact extends React.Component {

  state = {
    action: 'buy',
    shares: 1,
    price: null,
    latestTime: ''
  }

  componentDidMount() {
    let today = new Date()
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.selectedStockTicker.symbol}/book`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        price: res.quote.latestPrice,
        latestTime: today
      })
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

  }

  // handleClick = (event) => {
  //   let shares = 0
  //   let current_shares = 0
  //
  //   if (this.state.action === "sell") {
  //     shares = -(this.state.shares)
  //     current_shares = 0
  //   }
  //   if (this.state.action === 'buy') {
  //     shares = this.state.shares
  //     current_shares = this.state.shares
  //   }
  //
  //   fetch('http://localhost:3001/transactions', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accepts": "application/json",
  //     },
  //     body: JSON.stringify({game_player_id: this.props.currentGamePlayer.id, symbol: this.props.selectedStockTicker.symbol, price: this.state.price, original_shares: shares, current_shares: current_shares, transaction_date: this.state.latestTime})
  //   })
  //   .then(res => res.json())
  //   .then(response => {
  //
  //     if (this.state.action === 'sell') {
  //
  //       let sold_stock_symbol = response.symbol
  //       let sold_stock_price = response.price
  //       let sold_stock_shares = -(response.original_shares)
  //
  //       const transactions = this.props.currentGamePlayer.transactions
  //       let relevant_transactions = []
  //       transactions.forEach(item => {
  //         if (item.symbol === sold_stock_symbol && item.original_shares > 0) {
  //           relevant_transactions.push(item)
  //         }
  //       })
  //
  //       // Order relevant_transaction by transaction_date!
  //       relevant_transactions.sort((a, b) => new Date(a.transaction_date) - new Date(b.transaction_date))
  //
  //       let shares_to_be_sold = sold_stock_shares
  //       let cash_to_add = 0
  //
  //       for (let i = 0; i < relevant_transactions.length; i++) {
  //         if (shares_to_be_sold >= 1) {
  //           if (relevant_transactions[i].current_shares >= shares_to_be_sold) {
  //             let shares = relevant_transactions[i].current_shares - shares_to_be_sold
  //
  //             cash_to_add += (shares_to_be_sold * sold_stock_price) - (shares_to_be_sold * relevant_transactions[i].price)
  //
  //             shares_to_be_sold = 0
  //
  //             fetch(`http://localhost:3001/transactions/${relevant_transactions[i].id}`, {
  //               method: "PATCH",
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 "Accepts": "application/json",
  //               },
  //               body: JSON.stringify({
  //                 current_shares: shares
  //               })
  //             })
  //
  //           } else if (relevant_transactions[i].current_shares < shares_to_be_sold) {
  //             shares_to_be_sold -= relevant_transactions[i].current_shares
  //             let shares = 0 // relevant_transactions[i].current_shares =
  //
  //             cash_to_add += (relevant_transactions[i].current_shares * sold_stock_price) - (relevant_transactions[i].current_shares * relevant_transactions[i].price)
  //
  //             fetch(`http://localhost:3001/transactions/${relevant_transactions[i].id}`, {
  //               method: "PATCH",
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 "Accepts": "application/json",
  //               },
  //               body: JSON.stringify({
  //                 current_shares: shares
  //               })
  //             })
  //           }
  //         }
  //         fetch(`http://localhost:3001/game_players/${this.props.currentGamePlayer.id}`, {
  //           method: "PATCH",
  //           headers: {
  //             "Content-Type": "application/json",
  //             "Accepts": "application/json",
  //           },
  //           body: JSON.stringify({
  //             cash_to_add: cash_to_add
  //           })
  //         })
  //       }
  //     }
  //
  //     this.props.closeModal()
  //     this.props.handleClick('research')
  //     this.props.history.push('/loading') // This does not work...
  //   })
  // }

  handleClick = (event) => {
    const { action, shares, price, latestTime } = this.state
    if (action === 'buy') {
      fetch(`http://localhost:3001/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
        },
        body: JSON.stringify({game_player_id: this.props.currentGamePlayer.id, symbol: this.props.selectedStockTicker.symbol, price: price, original_shares: shares, current_shares: shares, transaction_date: latestTime})
      })
    } else if (action === 'sell') {
      fetch(`http://localhost:3001/sell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
        },
        body: JSON.stringify({game_player_id: this.props.currentGamePlayer.id, symbol: this.props.selectedStockTicker.symbol, price: price, original_shares: -(shares), current_shares: 0, transaction_date: latestTime})
      })
    }
    this.props.closeModal()
    this.props.handleClick('research')
    this.props.history.push('/loading')
  }

  render() {
    return (
      <div id="InTransact">
      <Modal.Content image scrolling>
        <Modal.Description>
          <h1>{this.props.selectedStockTicker.name}</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              How many shares?
              <input onChange={this.handleChange} type="number" name="shares" placeholder="shares" value={this.state.shares} />
            </label>
            <select name="action" value={this.state.action} onChange={this.handleChange}>
              <option value="buy">buy</option>
              <option value="sell">sell</option>
            </select>

            <button type="submit">Submit</button>
          </form>
          <p>Price per share: ${this.state.price}</p>
          <p>Shares: {this.state.shares}</p>
          <p>Total: ${this.state.price * this.state.shares}</p>
          <p>Total Cash: ${this.props.currentGamePlayer.cash_balance}</p>
          <p>Remaing Cash: ${this.props.currentGamePlayer.cash_balance - (this.state.price * this.state.shares)}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <div>
          <Button primary onClick={() => this.props.handleClick('research')}>
            Back <Icon name='chevron right' />
          </Button>
          <Button primary onClick={this.handleClick}>
            Buy <Icon name='chevron right' />
          </Button>
        </div>
      </Modal.Actions>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    // currentUser: state.currentUser,
    // currentGame: state.currentGame,
    currentGamePlayer: state.currentGamePlayer,
    selectedStockTicker: state.selectedStockTicker,
    currentGameId: state.currentGameId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPortfolio: (portfolio) => {
      dispatch({type: "SET_PORTFOLIO", payload: portfolio})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Transact);

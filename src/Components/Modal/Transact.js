import React from 'react';
import { connect } from 'react-redux'
// import './Modal.css';
// import Autocomplete from "./Autocomplete.jsx";
// import Research from './Research'
// import Graph from './Graph'
import history from '../../history';

import { Button, Icon, Modal } from 'semantic-ui-react'

class Transact extends React.Component {

  state = {
    buy: true,
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

  handleClick = (event) => {
    fetch('http://localhost:3001/transactions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify({game_player_id: this.props.currentGamePlayer.id, symbol: this.props.selectedStockTicker.symbol, price: this.state.price, shares: this.state.shares, transaction_date: this.state.latestTime})
    })
    .then(res => res.json())
    .then(response => {
      // CLOSE MODAL HERE
      history.push('/stage')
    })
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
      currentUser: state.currentUser,
      currentGame: state.currentGame,
      currentGamePlayer: state.currentGamePlayer,
      selectedStockTicker: state.selectedStockTicker
    }
  }

export default connect(mapStateToProps)(Transact);

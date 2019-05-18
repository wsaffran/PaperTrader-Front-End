import React from 'react';
import { connect } from 'react-redux'
// import './Modal.css';
// import Autocomplete from "./Autocomplete.jsx";
// import Research from './Research'
// import Graph from './Graph'
import { Modal } from 'semantic-ui-react'

class Transact extends React.Component {

  state = {
    buy: true,
    shares: 1,
    price: null
  }

  componentDidMount() {
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.selectedStockTicker.symbol}/book`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        price: res.quote.latestPrice
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

  render() {
    return (
      <div id="InTransact">
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

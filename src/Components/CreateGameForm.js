import React from 'react'
import { connect } from 'react-redux'
import history from '../history';


class CreateGameForm extends React.Component {

  state = {
    name: '',
    startingBalance: "",
    startDate: '',
    endDate: '',
    errors: null
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3001/new_game', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(response => {
      fetch('http://localhost:3001/join_game', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
        },
        body: JSON.stringify({user_id: this.props.currentUser.id, game_id: response.id})
      })
      .then(res => res.json())
      .then(response => {
        console.log(history);
        this.props.updateGamePlayers(response)
      })
    })
    this.setState({
      name: '',
      startingBalance: "",
      startDate: '',
      endDate: '',
      errors: null
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          name:
          <input onChange={this.handleChange} type="text" name="name" placeholder="my awesome game" value={this.state.name} />
        </label>
        <label>
          Starting Balance:
          <input onChange={this.handleChange} type="number" name="startingBalance" placeholder="100000" value={this.state.startingBalance} />
        </label>
        <label>
          Start Date:
          <input onChange={this.handleChange} type="date" name="startDate"
             value={this.state.startDate}
             min="2018-01-01" max="2020-12-31"/>
        </label>
        <label>
          End Date:
          <input onChange={this.handleChange} type="date" name="endDate"
             value={this.state.endDate}
             min="2018-01-01" max="2020-12-31"/>
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return {
    updateGamePlayers: (gamePlayer) => {
      dispatch({type: "UPDATE_GAME_PLAYERS", payload: gamePlayer})
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameForm)

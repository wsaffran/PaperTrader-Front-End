import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Form, Card, Container } from 'semantic-ui-react'

// import history from '../history';


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
      this.props.updateGames(response)
      fetch('http://localhost:3001/join_game', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
        },
        body: JSON.stringify({user_id: this.props.currentUser.id, game_id: response.id, cash_balance: parseInt(this.state.startingBalance)})
      })
      .then(res => res.json())
      .then(response => {
        this.props.updateGamePlayers(response)
        const token = localStorage.getItem("token")   // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES

        if (token) {                                  // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
          fetch("http://localhost:3001/auto_login", { // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
            headers: {
              "Authorization": token                  // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
            }                                         // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
          })
          .then(res => res.json())                    // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
          .then((response) => {                       // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
            this.props.setCurrentUser(response)       // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
          })                                          // INSTEAD OF THIS, DO JUST UPDATE THE USER'S GAMES
        }
        this.props.updateActiveItem('yourGames')
        this.props.history.push('/loading1')

      })
    }, () => {
      this.setState({
        name: '',
        startingBalance: "",
        startDate: '',
        endDate: '',
        errors: null
      })
    })
  }

  render () {
    return (
      <Container style={{marginTop: '40px', marginRight: '20px'}}>
        <Card>
          <Card.Content>
            <Card.Header className='center aligned'>
              CREATE A GAME
            </Card.Header>
            <Card.Description>
              <Form onSubmit={this.handleSubmit}>
                <Input className='fluid' style={{padding: '10px'}} onChange={this.handleChange} type="text" name="name" placeholder="name" value={this.state.name} />
                <Input className='fluid' style={{padding: '10px'}} onChange={this.handleChange} type="number" name="startingBalance" placeholder="player starting balance" value={this.state.startingBalance} />
                <Input className='fluid' style={{padding: '10px'}} onChange={this.handleChange} type="date" name="startDate" placeholder="start date"
                  value={this.state.startDate}
                  min="2018-01-01" max="2020-12-31"/>
                <p>Start Date</p>
                <Input className='fluid' style={{padding: '10px'}} onChange={this.handleChange} type="date" name="endDate" placeholder="end date"
                  value={this.state.endDate}
                  min="2018-01-01" max="2020-12-31"/>
                <p>End Date</p>
                <Button type="submit">Submit</Button>
              </Form>
            </Card.Description>
          </Card.Content>
        </Card>
      </Container>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return {
    updateGamePlayers: (gamePlayer) => {
      dispatch({type: "UPDATE_GAME_PLAYERS", payload: gamePlayer})
    },
    updateGames: (games) => {
      dispatch({type: "SET_GAMES", payload: games})
    },
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
    },
    updateActiveItem: (activeItem) => {
      dispatch({type: "UPDATE_ACTIVE_ITEM", payload: activeItem})
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    // currentGame: state.currentGame,
    // games: state.games,
    // users: state.users,
    // gamePlayers: state.gamePlayers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGameForm)

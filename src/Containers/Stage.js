import React from 'react'
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
// import v4 from 'uuid'

class Stage extends React.Component {

  render () {
    return (
      <h1>Stage</h1>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentGame: state.currentGame,
    games: state.games,
    users: state.users,
    gamePlayers: state.gamePlayers
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)

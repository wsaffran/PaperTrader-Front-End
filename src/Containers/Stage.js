import React from 'react'
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
// import v4 from 'uuid'
import Search from '../Components/Search'
import YourProfile from '../Components/YourProfile'
import YourPortfolio from '../Components/YourPortfolio'
import PortfolioPerformance from '../Components/PortfolioPerformance'
import YourTransactions from '../Components/YourTransactions'

class Stage extends React.Component {

  render () {
    return (
      <div>
        <h1>Stage</h1>
        <Search />
        <YourProfile />
        <YourPortfolio />
        <PortfolioPerformance />
        <YourTransactions />
      </div>
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

import React from 'react'
import { connect } from 'react-redux'

class Loading1 extends React.Component {

  componentDidMount() {
    // fetch(`http://localhost:3001/games/${this.props.currentGamePlayer.id}`)
    // .then(res => res.json())
    // .then(res => {
    //   this.props.setPortfolio(res)
      this.props.history.push(`/game`)
    // })
  }

  render() {
    return (
      <div>
        <h1>Loading...</h1>
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



export default connect(mapStateToProps,mapDispatchToProps)(Loading1)

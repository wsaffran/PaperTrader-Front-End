import React from 'react'
import { connect } from 'react-redux'

class YourPortfolio extends React.Component {

  render () {
    return (
      <h3>YourPortfolio</h3>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(YourPortfolio)

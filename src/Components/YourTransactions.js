import React from 'react'
import { connect } from 'react-redux'

class Transactions extends React.Component {

  render () {
    return (
      <h3>Transactions</h3>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Transactions)

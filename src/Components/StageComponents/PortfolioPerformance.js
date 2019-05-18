import React from 'react'
import { connect } from 'react-redux'

class PortfolioPerformance extends React.Component {

  render () {
    return (
      <h3>PortfolioPerformance</h3>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(PortfolioPerformance)

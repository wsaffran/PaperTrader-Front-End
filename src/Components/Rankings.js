import React from 'react'
import { connect } from 'react-redux'

class Rankings extends React.Component {

  render () {
    return (
      <h3>Rankings</h3>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Rankings)

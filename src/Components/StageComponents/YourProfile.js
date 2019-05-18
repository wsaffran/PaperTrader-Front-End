import React from 'react'
import { connect } from 'react-redux'

class YourProfile extends React.Component {

  render () {
    return (
      <h3>YourProfile</h3>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(YourProfile)

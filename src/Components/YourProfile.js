import React from 'react'
import { connect } from 'react-redux'

class YourProfile extends React.Component {

  render () {
    return (
      <div>
        <h3>YourProfile</h3>
        <p>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</p>
        <p>Ranking: </p>
        <p>% Gain: </p>
        <p>$ Gain: </p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(YourProfile)

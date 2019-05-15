import React from 'react'

class UserProfile extends React.Component {

  render () {
    return (
      <h1>{this.props.currentUser ? this.props.currentUser.username : "Hello"}</h1>
    )
  }

}

export default UserProfile

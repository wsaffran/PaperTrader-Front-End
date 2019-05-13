import React from 'react'

class LandingPage extends React.Component {

  handleClick = (event) => {
    if (event.target.name === "login") {
      this.props.history.push(`login`)
    } else {
      this.props.history.push('signup')
    }
  }

  render () {
    return (
      <div>
        <h1>Paper Trader</h1>
        <button name='login' onClick={this.handleClick}>Login</button>
        <button name='signup' onClick={this.handleClick}>Sign Up</button>
      </div>
    )
  }

}

export default LandingPage

import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

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
        {this.props.currentUser ?
          <p>put some detailed infor about the website</p>
          :
          <div>
            <Button name='login' onClick={this.handleClick}>Login</Button>
            <Button name='signup' onClick={this.handleClick}>Sign Up</Button>
          </div>
        }
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(LandingPage)

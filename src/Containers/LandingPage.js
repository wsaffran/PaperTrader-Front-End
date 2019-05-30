import React from 'react'
import { connect } from 'react-redux'
import { Button, Container } from 'semantic-ui-react'

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
        <Container style={{flex: 'center', marginLeft: '45%', marginTop: '17%'}}>
          <h1 style={{fontSize: '50px'}}>Paper Trader</h1>
          <Button name='login' onClick={this.handleClick}>Login</Button>
          <Button name='signup' onClick={this.handleClick}>Sign Up</Button>
        </Container>
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

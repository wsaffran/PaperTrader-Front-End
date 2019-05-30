import React from 'react'
import { connect } from 'react-redux'
import { Button, Container, Input, Form } from 'semantic-ui-react'

class SignupForm extends React.Component {

  state = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    errors: null
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3001/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      } else {
        this.props.setCurrentUser(response)
        localStorage.setItem("token", response.token)
        this.props.history.push('/game')
      }
    })
  }

  render () {
    return (
      <Container style={{flex: 'center', marginLeft: '45%', marginTop: '17%'}}>
        <h1>Sign Up</h1>
        <Form onSubmit={this.handleSubmit}>
            <Input style={{marginRight: '20px', marginBottom: '20px'}} onChange={this.handleChange} type="text" name="firstName" placeholder='First Name' value={this.state.firstName} />
            <Input onChange={this.handleChange} type="text" name="lastName" placeholder='Last Name' value={this.state.lastName} /> <br/>
            <Input style={{marginRight: '20px', marginBottom: '20px'}} onChange={this.handleChange} type="text" name="username" placeholder='Username' value={this.state.username} />
            <Input onChange={this.handleChange} type="password" name="password" placeholder='Password' value={this.state.password} /> <br/>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)

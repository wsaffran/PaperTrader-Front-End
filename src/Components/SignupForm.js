import React from 'react'
import { connect } from 'react-redux'
import { Button, Container } from 'semantic-ui-react'
import form from './css/signupForm.css'

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='field-first-name'>
            <i className="fas fa-user"></i>
            <input onChange={this.handleChange} type="text" name="firstName" placeholder="First Name" value={this.state.firstName} required/>
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className='field-last-name'>
            <i className="fas fa-user"></i>
            <input onChange={this.handleChange} type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} required/>
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className='field-username'>
            <i className="fas fa-user"></i>
            <input onChange={this.handleChange} type="text" name="username" placeholder="Username" value={this.state.username} required/>
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className='field-password'>
            <i className="fas fa-key"></i>
            <input onChange={this.handleChange} type="password" name="password" placeholder="Password" value={this.state.password} required/>
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className='submit'>
            <Button primary type='submit'>Submit</Button>
          </div>
        </form>
      </div>
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

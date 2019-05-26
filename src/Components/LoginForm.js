import React from 'react'
import { connect } from 'react-redux'
import { Button } from  'semantic-ui-react'
import form from './css/loginForm.css'

class LoginForm extends React.Component {

  state = {
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
    fetch('http://localhost:3001/login', {
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
        this.props.history.push(`/game/your`)
      }
    })
  }

  render () {
    return (
        <form onSubmit={this.handleSubmit}>
          <div className="field-name">
            <i className="fas fa-user"></i>
            <input onChange={this.handleChange} type="text" name="username" placeholder="Username" value={this.state.username} required />
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className='field-password'>
            <i className="fas fa-key"></i>
            <input onChange={this.handleChange} type="password" name="password" placeholder="Password" value={this.state.password} required/>
            <i className="fas fa-arrow-down"></i>
          </div>
          <div className="submit">
            <Button primary type='submit'>Submit</Button>
          </div>
        </form>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => {
      // dispatch is our new setState and it takes an object with a type and a payload
      dispatch({type: "SET_CURRENT_USER", payload: user})
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

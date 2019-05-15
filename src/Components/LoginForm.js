import React from 'react'

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
      }
    })
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            username:
            <input onChange={this.handleChange} type="text" name="username" value={this.state.username} />
          </label>
          <label>
            password:
            <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

export default LoginForm

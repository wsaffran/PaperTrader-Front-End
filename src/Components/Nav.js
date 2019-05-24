import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends React.Component {

  render () {
    return (
      <div className="topnav">
        <Link className="home" to={this.props.currentUser ? "/game/your" : "/"}>Home</Link>
        {this.props.currentUser ?
          <div>
            <Link className="logOut" onClick={this.props.logOut} to='/'>Log out </Link>
            <Link className="userProfile" to="/user">{this.props.currentUser.username}</Link>
          </div>
          :
          <Link className="user" to="/">Login</Link>
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

export default connect(mapStateToProps)(Nav)

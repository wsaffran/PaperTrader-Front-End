import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends React.Component {

  render () {
    return (
      <div className="topnav">
        <Link className="home" to={this.props.currentUser ? "/game" : "/"}>Home</Link>
        <Link style={{marginLeft: '90%'}} className="logOut" onClick={this.props.logOut} to='/'>Log out </Link>
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

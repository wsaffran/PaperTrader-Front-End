import React from 'react'
import { connect } from 'react-redux'
import v4 from 'uuid'


class Rankings extends React.Component {

  state = {
    rankings: null
  }

  renderRankings = () => {
    console.log(this.props.rankings);
    return this.props.rankings.map(ranking => {
      return <p key={v4()}>{ranking[0].game_player_id}</p>
    })
  }

  componentDidMount() {
    this.setState({
      rankings: this.props.rankings
    })
  }

  render () {
    return (
      <div>
        <h3>Rankings</h3>
        {this.renderRankings()}
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    rankings: state.rankings
  }
}

export default connect(mapStateToProps)(Rankings)

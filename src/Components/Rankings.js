import React from 'react'
import { connect } from 'react-redux'
import { Table, Container, Loader, Card } from 'semantic-ui-react'
import v4 from 'uuid'


class Rankings extends React.Component {

  state = {
    rankings: [],
    isLoading: true
  }

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(2)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  componentDidMount() {
    fetch(`http://localhost:3001/game_players/${localStorage.getItem('currentGamePlayer')}`)
    .then(res => res.json())
    .then(res => {
      this.props.setCurrentGamePlayer(res)
    })
    fetch(`http://localhost:3001/games/${this.props.match.params.currentGameId}/rankings`)
    .then(res => res.json())
    .then(res => {
      this.setState({rankings: res, isLoading: false})
    })
  }

  handleClick = (id) => {
    this.props.history.push(`/game_player/${id}`)
  }

  renderRankings = () => {
    return this.state.rankings.map(ranking => {
      if (ranking.game_player_id === this.props.currentGamePlayer.id) {
        return (
          <Table.Row style={{backgroundColor: "lightorange"}} key={v4()} value={ranking.game_player_id} onClick={() => this.handleClick(ranking.game_player_id)}>
            {ranking.ranking === 1 ?
              <Table.Cell className='center aligned' style={{fontWeight: 'bold'}}><i class="fas fa-medal"></i></Table.Cell>
              :
              <Table.Cell className='center aligned' style={{fontWeight: 'bold'}}>{ranking.ranking}</Table.Cell>
            }
            <Table.Cell className='center aligned' style={{fontWeight: 'bold'}}>{ranking.username}</Table.Cell>
            <Table.Cell className='center aligned' style={{fontWeight: 'bold'}}>${this.numberWithCommas(ranking.starting_balance)}</Table.Cell>
            <Table.Cell className='center aligned' style={{fontWeight: 'bold'}}>${this.numberWithCommas(ranking.current_value)}</Table.Cell>
            <Table.Cell className='center aligned' style={{fontWeight: 'bold'}}>${this.numberWithCommas(ranking.returns)}</Table.Cell>
            <Table.Cell className='center aligned' style={{fontWeight: 'bold'}}>{this.numberWithCommas(ranking.percent_gain)}%</Table.Cell>
          </Table.Row>
        )
      } else {
        return (
          <Table.Row key={v4()} value={ranking.game_player_id} onClick={() => this.handleClick(ranking.game_player_id)}>
            {ranking.ranking === 1 ?
              <Table.Cell className='center aligned'><i className="fas fa-medal"></i></Table.Cell>
              :
              <Table.Cell className='center aligned'>{ranking.ranking}</Table.Cell>
            }
            <Table.Cell className='center aligned'>{ranking.username}</Table.Cell>
            <Table.Cell className='center aligned'>${this.numberWithCommas(ranking.starting_balance)}</Table.Cell>
            <Table.Cell className='center aligned'>${this.numberWithCommas(ranking.current_value)}</Table.Cell>
            {ranking.returns >= 0 ?
              <React.Fragment>
                <Table.Cell style={{color: 'green'}} className='center aligned'>${this.numberWithCommas(ranking.returns)}</Table.Cell>
                <Table.Cell style={{color: 'green'}} className='center aligned'>{this.numberWithCommas(ranking.percent_gain)}%</Table.Cell>
              </React.Fragment>
              :
              <React.Fragment>
                <Table.Cell style={{color: 'red'}} className='center aligned'>${this.numberWithCommas(ranking.returns)}</Table.Cell>
                <Table.Cell style={{color: 'red'}} className='center aligned'>{this.numberWithCommas(ranking.percent_gain)}%</Table.Cell>
              </React.Fragment>
            }
          </Table.Row>
        )
      }
    })
  }

  // componentWillUnmount() {
  //   console.log("after");
  // }

  render () {
    return (
        <Container fluid>
          <Card fluid>
            <Card.Content header='Rankings' style={{backgroundColor: 'lightgray'}}/>
            <Card.Content>
              <Table className='singleline'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell className='center aligned'>Rank</Table.HeaderCell>
                    <Table.HeaderCell className='center aligned'>Username</Table.HeaderCell>
                    <Table.HeaderCell className='center aligned'>Starting Balance</Table.HeaderCell>
                    <Table.HeaderCell className='center aligned'>Current Value</Table.HeaderCell>
                    <Table.HeaderCell className='center aligned'>Total Return</Table.HeaderCell>
                    <Table.HeaderCell className='center aligned'>Percent Gain</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                {this.state.isLoading ?
                  <Table.Body>
                    <Table.Row>
                      <Table.HeaderCell colSpan={16} style={{padding: '10px'}} >
                        <Loader active inline='centered' />
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Body>
                  :
                  <Table.Body>
                    {this.props.currentGamePlayer ? this.renderRankings() : null}
                  </Table.Body>
                }
              </Table>
            </Card.Content>
          </Card>
        </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentGamePlayer: state.currentGamePlayer,
    // portfolio: state.portfolio,
    // currentUser: state.currentUser,
    // game: state.currentGame
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // setPortfolio: (portfolio) => {
    //   dispatch({type: "SET_PORTFOLIO", payload: portfolio})
    // },
    // updatePortfolio: (portfolio) => {
    //   dispatch({type: "UPDATE_PORTFOLIO", payload: portfolio})
    // },
    setCurrentGamePlayer: (game_player) => {
      dispatch({type: "SET_CURRENT_GAME_PLAYER", payload: game_player})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rankings)

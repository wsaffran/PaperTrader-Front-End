import React from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Card, Item } from 'semantic-ui-react'
import { Pie } from 'react-chartjs-2'

class YourProfile extends React.Component {

  state = {
    rankings: [],
    portfolio: []
  }

  numberWithCommas = (x, y) => {
    const floatNum = parseFloat(x).toFixed(y)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  fullName = () => {
    return this.props.currentUser.first_name + " " + this.props.currentUser.last_name
  }

  componentDidMount() {
    fetch(`http://localhost:3001/games/${this.props.currentGamePlayer.game.id}/rankings`)
    .then(res => res.json())
    .then(res => {
      this.setState({rankings: res})
    })
    fetch(`http://localhost:3001/portfolio/${this.props.currentGamePlayer.id}`)
    .then(res => res.json())
    .then(res => {
      console.log("response");
      this.setState({portfolio: res})
    })
  }

  getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


  getPieData = () => {
    let labels = []
    let data = []
    let backgroundColor = []

    this.state.portfolio.forEach(item => {
      labels.push(item.ticker)
      data.push(item.current_value.toFixed(4))
      backgroundColor.push(this.getRandomColor())
    })

    const selectedPlayer = this.state.rankings.find(ranking => ranking.game_player_id === this.props.currentGamePlayer.id)
    labels.push('cash')
    data.push(selectedPlayer.cash_value)
    backgroundColor.push(this.getRandomColor())

    const dataPie = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColor
        }
      ]
    }
    return dataPie
  }

  findStocksOwned = () => {
    let stocksOwned = []
    this.props.currentGamePlayer.transactions.forEach(transaction => {
      if (transaction.current_shares > 0) {
        return stocksOwned.push(transaction.symbol)
      } else {
        return null
      }
    })
    let uniqueItems = [...new Set(stocksOwned)]
    return uniqueItems.length
  }

  getRanking = () => {
    if (this.state.rankings.length > 0 && this.props.currentGamePlayer) {
      let ranking = this.state.rankings.find(ranking => ranking.game_player_id === this.props.currentGamePlayer.id)
      return (
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h3>{this.fullName()}</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>

            <Grid.Column>
              <Item>
                <Item.Content>
                  <Item.Meta>RANKING</Item.Meta>
                  <Item.Description>
                    {ranking.ranking}
                  </Item.Description>
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column>
              <Item>
                <Item.Content>
                  <Item.Meta>NET WORTH</Item.Meta>
                  <Item.Description>
                    ${this.numberWithCommas(ranking.current_value, 2)}
                  </Item.Description>
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column>
              <Item>
                <Item.Content>
                  <Item.Meta>OVERALL GAINS</Item.Meta>
                  <Item.Description>
                    ${this.numberWithCommas(ranking.returns, 2)}
                  </Item.Description>
                </Item.Content>
              </Item>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Item>
                <Item.Content>
                  <Item.Meta>OVERALL RETURNS</Item.Meta>
                  <Item.Description>
                    {this.numberWithCommas(ranking.percent_gain, 2)}%
                  </Item.Description>
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column>
              <Item>
                <Item.Content>
                  <Item.Meta>CASH POSITION</Item.Meta>
                  <Item.Description>
                    ${this.numberWithCommas(ranking.cash_value)}
                  </Item.Description>
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column>
              <Item>
                <Item.Content>
                  <Item.Meta>STOCKS OWNED</Item.Meta>
                  <Item.Description>
                    {this.findStocksOwned()}
                  </Item.Description>
                </Item.Content>
              </Item>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {this.state.portfolio ?
              <Pie data={this.getPieData()} options={{ responsive: true }} />
              :
              null
            }
          </Grid.Row>
        </Grid>
      )
    } else {
      return null
    }
  }

  render () {
    return (

      <Container>
        {this.props.currentGamePlayer && this.state.portfolio ?
          <Card fluid>
            <Card.Content header='Your Profile' style={{backgroundColor: 'lightgray'}}/>
            <Card.Content description={this.getRanking()} />
          </Card>
        :
          null
        }
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    portfolio: state.portfolio,
    currentGamePlayer: state.currentGamePlayer,
    currentGame: state.currentGame
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateRankings: (rankings) => {
      dispatch({type: "UPDATE_RANKINGS", payload: rankings})
    },
    setRankings: (rankings) => {
      dispatch({type: "SET_RANKINGS", payload: rankings})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourProfile)

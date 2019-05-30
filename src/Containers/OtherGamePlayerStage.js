import React from 'react'
import { connect } from 'react-redux'
import { Table, Container, Grid, Image, Dropdown, Card, Loader } from 'semantic-ui-react'
import green from '../Components/images/GREEN.png'
import red from '../Components/images/RED.png'
import OtherOverview from '../Components/OtherOverview'

import v4 from 'uuid'

class OtherGamePlayerStage extends React.Component {

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(2)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  state = {
    currentGamePlayer: null,
    gamePlayer: null,
    order: 'alphabetical',
    value: 'value',
    portfolio: [],
    isLoading: true
  }


  componentDidMount = () => {
    fetch(`http://localhost:3001/game_players/${this.props.match.params.game_player_id}`)
    .then(res => res.json())
    .then(res => {
      const game_player = res
      fetch(`http://localhost:3001/portfolio/${this.props.match.params.game_player_id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          gamePlayer: game_player,
          portfolio: res,
          isLoading: false
        })
      })
    })
  }

  handleClick = (a, b) => {
    this.setState({
      order: b.value,
    })
  }

  filteredPortfolio = () => {
    let order = this.state.order

    let portfolio = this.state.portfolio
    if (order === 'alphabetical') {
      return portfolio.sort(function(a, b) {
        return (a.ticker.toUpperCase() < b.ticker.toUpperCase()) ? -1 : (a.ticker.toUpperCase() > b.ticker.toUpperCase()) ? 1 : 0
      })
    } else if (order === 'alphabeticalReverse') {
      return portfolio.sort(function(a, b) {
        return (b.ticker.toUpperCase() < a.ticker.toUpperCase()) ? -1 : (b.ticker.toUpperCase() > a.ticker.toUpperCase()) ? 1 : 0
      })
    } else if (order === 'leastValue') {
      return portfolio.sort(function(a, b) {
        return (a.current_value < b.current_value) ? -1 : (a.current_value > b.current_value) ? 1 : 0
      })
    } else if (order === 'mostValue') {
      return portfolio.sort(function(a, b) {
        return (b.current_value < a.current_value) ? -1 : (b.current_value > a.current_value) ? 1 : 0
      })
    } else if (order === 'topPerformers') {
      return portfolio.sort(function(a, b) {
        return (b.percent_gain < a.percent_gain) ? -1 : (b.percent_gain > a.percent_gain) ? 1 : 0
      })
    } else if (order === 'bottomPerformers') {
      return portfolio.sort(function(a, b) {
        return (a.percent_gain < b.percent_gain) ? -1 : (a.percent_gain > b.percent_gain) ? 1 : 0
      })
    } else if (order === 'daysBest') {
      return portfolio.sort(function(a, b) {
        return (b.day_change_percent < a.day_change_percent) ? -1 : (b.day_change_percent > a.day_change_percent) ? 1 : 0
      })
    } else if (order === 'daysWorst') {
      return portfolio.sort(function(a, b) {
        return (a.day_change_percent < b.day_change_percent) ? -1 : (a.day_change_percent > b.day_change_percent) ? 1 : 0
      })
    } else {
      return portfolio.sort(function(a, b) {
        return (a.ticker.toUpperCase() < b.ticker.toUpperCase()) ? -1 : (a.ticker.toUpperCase() > b.ticker.toUpperCase()) ? 1 : 0
      })
    }
  }

  renderPortfolioTotals = () => {

    let netWorth = this.state.gamePlayer.cash_balance
    let day_change = 0
    let day_change_before = this.state.gamePlayer.cash_balance
    let day_change_after = this.state.gamePlayer.cash_balance
    this.state.portfolio.forEach(holding => {
      netWorth += holding.current_value
      day_change += holding.day_change
      day_change_before += holding.current_value - holding.day_change
      day_change_after += holding.current_value
    })
    let day_change_percent = (day_change_after - day_change_before) / day_change_before * 100

    let total_change = netWorth - this.state.gamePlayer.game.starting_balance
    let total_change_percent = total_change / this.state.gamePlayer.game.starting_balance * 100

    let foundRanking = null

    this.props.rankings.forEach(ranking => {
      if (ranking.game_player_id === this.state.gamePlayer.id) {
        foundRanking = ranking.ranking
      }
    })

    return (
      <Table.Row textAlign='center'>
        <Table.Cell className='noPaddingColor'>
          {day_change >= 0 ? <Image src={green}/> : <Image src={red}/>}
        </Table.Cell>
        <Table.Cell className='noPaddingSymbol' verticalAlign='top'>
          <span style={{color: 'black'}}>TOTAL</span> <br />
          <span style={{color: 'gray', fontSize:'12px'}}>---</span>
        </Table.Cell>
        <Table.Cell verticalAlign='top'>
          <span style={{color: 'black'}}>100%</span> <br />
          <span style={{color: 'gray', fontSize:'12px'}}>BUY</span>
        </Table.Cell>
        <Table.Cell verticalAlign='top'>
          <span>---</span> <br />
          <span style={{color: 'gray', fontSize:'12px'}}>---</span>
        </Table.Cell>
        <Table.Cell verticalAlign='top'>
          <span>---</span> <br />
          {day_change >= 0 ?
            <span style={{fontSize:'12px', color: "green"}}>${this.numberWithCommas(day_change)} / {this.numberWithCommas(day_change_percent)}%</span>
          :
            <span style={{fontSize:'12px', color: "red"}}>${this.numberWithCommas(day_change)} / {this.numberWithCommas(day_change_percent)}%</span>
          }
        </Table.Cell>
        <Table.Cell verticalAlign='top'>
          <span>${this.numberWithCommas(netWorth)}</span> <br />
          {total_change >= 0 ?
            <span style={{fontSize:'12px', color: 'green'}}>${this.numberWithCommas(total_change)} / {this.numberWithCommas(total_change_percent)}%</span>
          :
            <span style={{fontSize:'12px', color: 'red'}}>${this.numberWithCommas(total_change)} / {this.numberWithCommas(total_change_percent)}%</span>
          }
        </Table.Cell>
        <Table.Cell>
          <span>{foundRanking}</span> <br />
          <span style={{color: 'gray', fontSize:'12px'}}>RANKING</span> <br />
        </Table.Cell>
      </Table.Row>
    )
  }

  renderPortfolioItems = () => {
    return this.filteredPortfolio().map(holding => {
      return (
        <Table.Row textAlign='center' key={v4()}>
          <Table.Cell className='noPaddingColor'>
            {holding.day_change >= 0 ? <Image src={green}/> : <Image src={red}/>}
          </Table.Cell>
          <Table.Cell className='noPaddingSymbol' verticalAlign='top'>
            <span style={{color: 'black'}}>{holding.ticker}</span> <br />
            <span style={{color: 'gray', fontSize:'12px'}}>{holding.total_shares} SHARES</span>
          </Table.Cell>
          <Table.Cell verticalAlign='top'>
            <span style={{color: 'black'}}>{this.numberWithCommas(holding.percent_of_portfolio * 100)}%</span> <br />
            <span style={{color: 'gray', fontSize:'12px'}}>BUY</span>
          </Table.Cell>
          <Table.Cell verticalAlign='top'>
            <span>${this.numberWithCommas(holding.current_stock_price)}</span> <br />
            {holding.stock_day_change >= 0 ?
              <span style={{fontSize:'12px', color: "green"}}>${this.numberWithCommas(holding.stock_day_change)} / {this.numberWithCommas(holding.day_change_percent)}%</span>
            :
              <span style={{fontSize:'12px', color: "red"}}>${this.numberWithCommas(holding.stock_day_change)} / {this.numberWithCommas(holding.day_change_percent)}%</span>
            }
          </Table.Cell>
          <Table.Cell verticalAlign='top'>
            <span>${this.numberWithCommas(holding.current_stock_price)}</span> <br />
            {holding.day_change >= 0 ?
              <span style={{fontSize:'12px', color: 'green'}}>${this.numberWithCommas(holding.day_change)} / {this.numberWithCommas(holding.day_change_percent)}%</span>
              :
              <span style={{fontSize:'12px', color: "red"}}>${this.numberWithCommas(holding.day_change)} / {this.numberWithCommas(holding.day_change_percent)}%</span>
            }
          </Table.Cell>
          <Table.Cell verticalAlign='top'>
            <span>${this.numberWithCommas(holding.current_value)}</span> <br />
            {holding.value_gain >= 0 ?
              <span style={{fontSize:'12px', color: "green"}}>${this.numberWithCommas(holding.value_gain)} / {this.numberWithCommas(holding.percent_gain)}%</span>
              :
              <span style={{fontSize:'12px', color: "red"}}>${this.numberWithCommas(holding.value_gain)} / {this.numberWithCommas(holding.percent_gain)}%</span>
            }
          </Table.Cell>
          <Table.Cell>
            <span>{holding.players_holding}</span> <br />
            <span style={{color: 'gray', fontSize:'12px'}}>PLAYERS</span>
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  renderCashItems = () => {
    let cash = this.state.gamePlayer.cash_balance
    let netWorth = 0
    this.props.rankings.forEach(ranking => {
      if (ranking.game_player_id === this.state.gamePlayer.id) {
        netWorth = ranking.current_value
      }
    })

    return (
      <Table.Row textAlign='center' key={v4()}>
        <Table.Cell className='noPaddingColor'>
          {cash >= 0 ? <Image src={green}/> : <Image src={red}/>}
        </Table.Cell>
        <Table.Cell className='noPaddingSymbol' verticalAlign='top'>
          <span style={{color: 'black'}}>CASH</span> <br />
          <span style={{color: 'gray', fontSize:'12px'}}>{this.numberWithCommas(cash)} SHARES</span>
        </Table.Cell>
        <Table.Cell verticalAlign='top'>
          <span style={{color: 'black'}}>{this.numberWithCommas(cash / netWorth)}%</span> <br />
          <span style={{color: 'gray', fontSize:'12px'}}>CASH</span>
        </Table.Cell>
        <Table.Cell verticalAlign='top'>
          <span>$1.00</span> <br />
          <span style={{color: 'gray', fontSize:'12px'}}>---</span>
        </Table.Cell>
        <Table.Cell verticalAlign='top'>
          <span>$1.00</span> <br />
          <span style={{color: 'gray', fontSize:'12px'}}>---</span>
        </Table.Cell>
        <Table.Cell verticalAlign='top'>
          <span>${this.numberWithCommas(cash)}</span> <br />
          <span style={{color: 'gray', fontSize:'12px'}}>---</span>
        </Table.Cell>
        <Table.Cell>
          <span>{this.props.rankings.length}</span> <br />
          <span style={{color: 'gray', fontSize:'12px'}}>PLAYERS</span>
        </Table.Cell>
      </Table.Row>
    )
  }

  getOptions = () => {
    return (
      [
        {key: 'Most Value', text: 'Most Value', value: 'mostValue'},
        {key: 'Least Value', text: 'Least Value', value: 'leastValue'},
        {key: 'Top Performers', text: 'Top Performers', value: 'topPerformers'},
        {key: 'Bottom Performers', text: 'Bottom Performers', value: 'bottomPerformers'},
        {key: "Day's Best", text: "Day's Best", value: 'daysBest'},
        {key: "Day's Worst", text: "Day's Worst", value: 'daysWorst'},
        {key: 'Ticker (A-Z)', text: 'Ticker (A-Z)', value: 'alphabetical'},
        {key: 'Ticker (Z-A)', text: 'Ticker (Z-A)', value: 'alphabeticalReverse'}
      ]
    )
  }

  renderDrowdown = () => {
    return (
      <Grid>
        <Grid.Column className='Left floated left aligned column' width={4}>
          <Dropdown onChange={(a, b) => this.handleClick(a, b)} placeholder='Sort By' search selection options={this.getOptions()} />
        </Grid.Column>
      </Grid>
    )
  }

  renderTable = () => {

    return (
      <Table basic='very'>
        <Table.Body className='noPadding'>
          <Table.Row textAlign='center'>
            <Table.Cell className='noPaddingColor'></Table.Cell>
            <Table.Cell verticalAlign='top' className="noPaddingCell noPaddingSymbol">
              <span style={{color: 'black', fontSize:'12px', letterSpacing: '.5px'}}>SYMBOL</span> <br />
              <span style={{color: 'gray', fontSize:'10px', letterSpacing: '.5px'}}>SHARES</span>
            </Table.Cell>
            <Table.Cell verticalAlign='top' className="noPaddingCell">
              <span style={{color: 'black', fontSize:'12px', letterSpacing: '.5px'}}>% HOLDINGS</span> <br />
              <span style={{color: 'gray', fontSize:'10px', letterSpacing: '.5px'}}>TYPE</span>
            </Table.Cell>
            <Table.Cell verticalAlign='top' className="noPaddingCell">
              <span style={{color: 'black', fontSize:'12px', letterSpacing: '.5px'}}>DAY</span> <br />
              <span style={{color: 'gray', fontSize:'10px', letterSpacing: '.5px'}}>CHG/CHG%</span>
            </Table.Cell>
            <Table.Cell verticalAlign='top' className="noPaddingCell">
              <span style={{color: 'black', fontSize:'12px', letterSpacing: '.5px'}}>PRICE</span> <br />
              <span style={{color: 'gray', fontSize:'10px', letterSpacing: '.5px'}}>CHG/CHG%</span>
            </Table.Cell>
            <Table.Cell verticalAlign='top' className="noPaddingCell">
              <span style={{color: 'black', fontSize:'12px', letterSpacing: '.5px'}}>VALUE</span> <br />
              <span style={{color: 'gray', fontSize:'10px', letterSpacing: '.5px'}}>GAIN/LOSS</span>
            </Table.Cell>
            <Table.Cell verticalAlign='top' className="noPaddingCell">
              <span style={{color: 'black', fontSize:'12px', letterSpacing: '.5px'}}>PLAYERS</span> <br />
              <span style={{color: 'gray', fontSize:'10px', letterSpacing: '.5px'}}>HOLDING</span>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
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
            {this.renderPortfolioItems()}
            {this.renderCashItems()}
            {this.renderPortfolioTotals()}
          </Table.Body>
        }
      </Table>
    )
  }

  getPortfolio = () => {
    let total_value = 0
    this.orderedPortfolio().map(holding => {
      total_value += holding.current_value
      return null
    })

    total_value += this.printCurrentCashValue()

    return this.state.portfolio.map(holding => {
      return (
        <Table.Row key={v4()}>
          <Table.Cell>{holding.ticker}</Table.Cell>
          <Table.Cell>{holding.total_shares}</Table.Cell>
          <Table.Cell>${this.numberWithCommas(holding.current_stock_price)}</Table.Cell>
          <Table.Cell>TBD</Table.Cell>
          <Table.Cell>${this.numberWithCommas(holding.value_gain)}</Table.Cell>
          <Table.Cell>{this.numberWithCommas((holding.current_value - holding.total_cost) / holding.total_cost * 100)}%</Table.Cell>
          <Table.Cell>${this.numberWithCommas(holding.cost_basis)}</Table.Cell>
          <Table.Cell>${this.numberWithCommas(holding.current_value)}</Table.Cell>
          <Table.Cell>${this.numberWithCommas(holding.total_cost)}</Table.Cell>
          <Table.Cell>{this.numberWithCommas(holding.current_value / total_value * 100)}%</Table.Cell>
        </Table.Row>
      )
    })
  }

  render () {
    return (
      <Container >
        {this.state.gamePlayer && this.props.rankings ?
          <Container>
            <Card className='fluid'>

                <OtherOverview match={this.props.match} game={this.state.gamePlayer.game.id}/>

            </Card>
            <Card className="fluid">
              <Card.Content header='Portfolio' style={{backgroundColor: 'lightgray'}}/>
              <Card.Content description={this.renderDrowdown()} />
              <Card.Content className="noBorder" description={this.renderTable()} />
            </Card>
          </Container>
        :
          null
        }
      </Container >
    )
  }}

function mapStateToProps(state) {
  return {
    currentGamePlayer: state.currentGamePlayer,
    portfolio: state.portfolio,
    rankings: state.rankings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPortfolio: (portfolio) => {
      dispatch({type: "SET_PORTFOLIO", payload: portfolio})
    },
    updatePortfolio: (portfolio) => {
      dispatch({type: "UPDATE_PORTFOLIO", payload: portfolio})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OtherGamePlayerStage)

import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { Table, Container, Grid, Card, Image, Dropdown, Loader } from 'semantic-ui-react'
import v4 from 'uuid'
import Search from './Search'
import './Table.css'
import green from './images/GREEN4.png'
import red from './images/RED2.png'


class YourPortfolio extends React.Component {

  numberWithCommas = (x) => {
    const floatNum = parseFloat(x).toFixed(2)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  // componentDidMount = () => {
  //
  //   const transactions = this.props.currentGamePlayer.transactions
  //   const distinctTickers = [...new Set(transactions.map(x => x.symbol))]
  //
  //   // Make ordered array of all transactions
  //   let orderedTransactions = []
  //   for (let i = 0; i < distinctTickers.length; i++) {
  //     transactions.map(transaction => {
  //       if (transaction.symbol === distinctTickers[i]) {
  //         return orderedTransactions.push(transaction)
  //       } else {
  //         return null
  //       }
  //     })
  //   }
  //
  //   fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${distinctTickers.join(',')}&types=quote`)
  //   .then(res => res.json())
  //   .then(res => {
  //
  //     let new_array = []
  //     for (let i = 0; i < distinctTickers.length; i++) {
  //       let total_cost = 0
  //       let total_shares = 0
  //       orderedTransactions.map(transaction => {
  //         if (transaction.symbol === distinctTickers[i]) {
  //           total_shares += Number.parseFloat(transaction.current_shares)
  //           total_cost += Number.parseFloat(transaction.price * transaction.current_shares)
  //           return null
  //         } else {
  //           return null
  //         }
  //       })
  //
  //       if(total_shares === 0) {
  //         // Removes Items That Dont Exist
  //       } else {
  //
  //         new_array.push({
  //           ticker: distinctTickers[i],
  //           total_cost: total_cost,
  //           total_shares: total_shares,
  //           cost_basis: total_cost / total_shares,
  //           current_stock_price: res[distinctTickers[i]].quote.latestPrice,
  //           value_gain: Number.parseFloat(res[distinctTickers[i]].quote.latestPrice * total_shares - total_cost),
  //           current_value: total_shares * res[distinctTickers[i]].quote.latestPrice
  //         })
  //       }
  //
  //     }
  //
  //     this.props.setPortfolio(new_array)
  //   })
  //
  // }

  state = {
    order: 'alphabetical',
    value: 'value',
    portfolio: [],
    isLoading: true
  }

  componentDidMount = () => {
    fetch(`http://localhost:3001/game_players/${localStorage.getItem('currentGamePlayer')}`)
    .then(res => res.json())
    .then(res => {
      this.props.setCurrentGamePlayer(res)
    })
    fetch(`http://localhost:3001/portfolio/${localStorage.getItem('currentGamePlayer')}`)
    .then(res => res.json())
    .then(res => {
      this.setState({portfolio: res, isLoading: false})
    })
  }

  // getCurrentCashValue = () => {
  //   const starting_cash = this.props.currentGamePlayer.cash_balance
  //   const transactions = this.props.currentGamePlayer.transactions
  //
  //   let total_cost = 0
  //   transactions.map(transaction => {
  //     return total_cost += transaction.price * transaction.current_shares
  //   })
  //
  //   let total_value = 0.00
  //
  //   this.state.portfolio.map(holding => {
  //     total_value += holding.current_value
  //     return null
  //   })
  //   // Issue here with calculating cash_balance... should I update cash balance every transaction instead???
  //   // Wait! is this actually and issue???
  //   const current_cash_value = starting_cash - total_cost
  //   return (
  //     <Table.Row key={v4()}>
  //       <Table.Cell textAlign='right'>CASH</Table.Cell>
  //       <Table.Cell textAlign='right'>{this.numberWithCommas(current_cash_value)}</Table.Cell>
  //       <Table.Cell textAlign='right'>$1.00</Table.Cell>
  //       <Table.Cell textAlign='right'></Table.Cell>
  //       <Table.Cell textAlign='right'></Table.Cell>
  //       <Table.Cell textAlign='right'></Table.Cell>
  //       <Table.Cell textAlign='right'>$1.00</Table.Cell>
  //       <Table.Cell textAlign='right'>${this.numberWithCommas(current_cash_value)}</Table.Cell>
  //       <Table.Cell textAlign='right'>{/*${this.numberWithCommas(current_cash_value)}*/}</Table.Cell>
  //       <Table.Cell textAlign='right'>{this.numberWithCommas(current_cash_value / (total_value + current_cash_value) * 100)}%</Table.Cell>
  //     </Table.Row>
  //   )
  // }

  // printCurrentCashValue = () => {
  //   const starting_cash = this.props.currentGamePlayer.cash_balance
  //   const transactions = this.props.currentGamePlayer.transactions
  //
  //   let total_cost = 0
  //   transactions.map(transaction => {
  //     return total_cost += transaction.price * transaction.current_shares
  //   })
  //
  //   const current_cash_value = starting_cash - total_cost
  //   return current_cash_value
  // }

  // getPortfolio = () => {
  //   let total_value = 0
  //   this.filteredPortfolio().map(holding => {
  //     total_value += holding.current_value
  //     return null
  //   })
  //
  //   total_value += this.printCurrentCashValue()
  //
  //   return this.state.portfolio.map(holding => {
  //     return (
  //       <Table.Row key={v4()} textAlign='right'>
  //         <Table.Cell textAlign='right'>{holding.ticker}</Table.Cell>
  //         <Table.Cell textAlign='right'>{holding.total_shares}</Table.Cell>
  //         <Table.Cell textAlign='right'>${this.numberWithCommas(holding.current_stock_price)}</Table.Cell>
  //         <Table.Cell textAlign='right'>${this.numberWithCommas(holding.day_change)}</Table.Cell>
  //         <Table.Cell textAlign='right'>${this.numberWithCommas(holding.value_gain)}</Table.Cell>
  //         <Table.Cell textAlign='right'>{this.numberWithCommas((holding.current_value - holding.total_cost) / holding.total_cost * 100)}%</Table.Cell>
  //         <Table.Cell textAlign='right'>${this.numberWithCommas(holding.cost_basis)}</Table.Cell>
  //         <Table.Cell textAlign='right'>${this.numberWithCommas(holding.current_value)}</Table.Cell>
  //         <Table.Cell textAlign='right'>${this.numberWithCommas(holding.total_cost)}</Table.Cell>
  //         <Table.Cell textAlign='right'>{this.numberWithCommas(holding.current_value / total_value * 100)}%</Table.Cell>
  //       </Table.Row>
  //     )
  //   })
  // }

  // getTotals = () => {
  //
  //   let total_cost = 0.00
  //   let total_gain = 0.00
  //   let total_value = 0.00
  //
  //   this.state.portfolio.map(holding => {
  //     total_cost += holding.total_cost
  //     total_gain += holding.value_gain
  //     total_value += holding.current_value
  //     return null
  //   })
  //
  //   return (
  //     <Table.Row key={v4()}>
  //       <Table.Cell textAlign='right'>Total</Table.Cell>
  //       <Table.Cell textAlign='right'></Table.Cell>
  //       <Table.Cell textAlign='right'></Table.Cell>
  //       <Table.Cell textAlign='right'>TBD</Table.Cell>
  //       <Table.Cell textAlign='right'>${this.numberWithCommas(total_gain)}</Table.Cell>
  //       <Table.Cell textAlign='right'>{ this.numberWithCommas(( (total_value + this.printCurrentCashValue()) - (total_cost + this.printCurrentCashValue()) ) / (total_cost + this.printCurrentCashValue()) * 100) }%</Table.Cell>
  //       <Table.Cell textAlign='right'></Table.Cell>
  //       <Table.Cell textAlign='right'>${this.numberWithCommas(total_value + this.printCurrentCashValue())}</Table.Cell>
  //       <Table.Cell textAlign='right'>{/*${this.numberWithCommas(total_cost + this.printCurrentCashValue())}*/}</Table.Cell>
  //       <Table.Cell textAlign='right'>100%</Table.Cell>
  //     </Table.Row>
  //   )
  // }


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

    let netWorth = this.props.currentGamePlayer.cash_balance
    let day_change = 0
    let day_change_before = this.props.currentGamePlayer.cash_balance
    let day_change_after = this.props.currentGamePlayer.cash_balance
    this.state.portfolio.forEach(holding => {
      netWorth += holding.current_value
      day_change += holding.day_change
      day_change_before += holding.current_value - holding.day_change
      day_change_after += holding.current_value
    })
    let day_change_percent = (day_change_after - day_change_before) / day_change_before * 100

    let total_change = netWorth - this.props.currentGamePlayer.game.starting_balance
    let total_change_percent = total_change / this.props.currentGamePlayer.game.starting_balance * 100

    let foundRanking = null

    this.props.rankings.forEach(ranking => {
      if (ranking.game_player_id === this.props.currentGamePlayer.id) {
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
    let cash = this.props.currentGamePlayer.cash_balance
    let netWorth = 0
    this.props.rankings.forEach(ranking => {
      if (ranking.game_player_id === this.props.currentGamePlayer.id) {
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
        <Grid.Column className='Left floated left aligned column' style={{paddingRight: '200px'}}>
          <Dropdown onChange={(a, b) => this.handleClick(a, b)} placeholder='Sort By' search selection options={this.getOptions()} />
        </Grid.Column>
        <Grid.Column className='Left floated left aligned column'>
          <Search history={this.props.history} portfolio={this.state.portfolio}/>
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

  render () {
    return (
      <Container fluid style={{margin: '0px', paddingLeft: '300px', paddingRight: '300px'}}>
        {this.props.currentGamePlayer && this.props.rankings ?
          <Card className="fluid">
            <Card.Content header='YOUR PORTFOLIO' style={{backgroundColor: 'lightgray'}}/>
            <Card.Content description={this.renderDrowdown()} />
            <Card.Content className="noBorder" description={this.renderTable()} />
          </Card>
        :
          null
        }
      </Container >
    )
  }

}

function mapStateToProps(state) {
  return {
    currentGamePlayer: state.currentGamePlayer,
    portfolio: state.portfolio,
    currentUser: state.currentUser,
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
    },
    setCurrentGamePlayer: (game_player) => {
      dispatch({type: "SET_CURRENT_GAME_PLAYER", payload: game_player})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(YourPortfolio)

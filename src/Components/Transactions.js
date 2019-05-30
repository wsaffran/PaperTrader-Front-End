import React from 'react'
import { Container, Grid, Dropdown, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
// import YourProfile from '../Components/YourProfile'
// import Rankings from '../Components/Rankings'

// import { Link } from 'react-router-dom';
// import CreateGameForm from '../Components/CreateGameForm'
import v4 from 'uuid'

class Transactions extends React.Component {

  state = {
    duration: 'newest',
    type: 'all'
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
  }

  getDurationOptions = () => {
    return (
      [
        {key: 'Newest', text: 'Newest', value: 'newest'},
        {key: 'Oldest', text: 'Oldest', value: 'oldest'}
      ]
    )
  }

  getTypeOptions = () => {
    return (
      [
        {key: 'All', text: 'All', value: 'all'},
        {key: 'Buy', text: 'Buy', value: 'buy'},
        {key: 'Sell', text: 'Sell', value: 'sell'}
      ]
    )
  }

  handleDurationClick = (a, b) => {
    this.setState({duration: b.value})
  }

  handleTypeClick = (a, b) => {
    this.setState({type: b.value})
  }

  renderDropdown = () => {
    return (
      <Grid>
        <Grid.Column className='Left floated left aligned column' style={{paddingRight: '200px'}}>
          <Dropdown onChange={(a, b) => this.handleDurationClick(a, b)} placeholder='Sort By' search selection options={this.getDurationOptions()} />
        </Grid.Column>
        <Grid.Column className='Left floated left aligned column' style={{paddingRight: '200px'}}>
          <Dropdown onChange={(a, b) => this.handleTypeClick(a, b)} placeholder='Sort By' search selection options={this.getTypeOptions()} />
        </Grid.Column>
      </Grid>
    )
  }

  renderTable = () => {
    return (
      <Table basic>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Symbol</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Transaction</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {this.renderTransactions()}
      </Table.Body>
    </Table>
    )
  }

  renderTransactions = () => {
    return this.filteredTransactions().map(transaction => {
      return (
        <Table.Row key={v4()}>
          <Table.Cell>{transaction.symbol}</Table.Cell>
          {transaction.original_shares > 0 ?
            <Table.Cell>Buy</Table.Cell>
            :
            <Table.Cell>Sell</Table.Cell>
          }
          <Table.Cell>{Math.abs(transaction.original_shares)} shares @ ${this.numberWithCommas(transaction.price)}</Table.Cell>
          <Table.Cell>{this.dateFormat(transaction.transaction_date)}</Table.Cell>
        </Table.Row>
      )
    })
  }

  filteredTransactions = () => {
    let orderedTransactions = this.props.currentGamePlayer.transactions

    if (this.state.duration === 'oldest') {
      orderedTransactions = this.props.currentGamePlayer.transactions.sort(function(a, b) {
        return (a.transaction_date < b.transaction_date) ? -1 : (a.transaction_date > b.transaction_date) ? 1 : 0
      })
      if (this.state.type === 'buy') {
        return orderedTransactions.filter(transaction => {
          return transaction.original_shares > 0
        })
      } else if (this.state.type === 'sell') {
        return orderedTransactions.filter(transaction => {
          return transaction.original_shares < 0
        })
      }
    }
    if (this.state.duration === 'newest') {
      orderedTransactions = this.props.currentGamePlayer.transactions.sort(function(a, b) {
        return (b.transaction_date < a.transaction_date) ? -1 : (b.transaction_date > a.transaction_date) ? 1 : 0
      })
      if (this.state.type === 'buy') {
        return orderedTransactions.filter(transaction => {
          return transaction.original_shares > 0
        })
      } else if (this.state.type === 'sell') {
        return orderedTransactions.filter(transaction => {
          return transaction.original_shares < 0
        })
      }
    }
    return orderedTransactions
  }

  timeFormat = (time) => {
    let hour = time[0]
    let type = ''
    let newHour = ''

    if (hour < 13) {
      type = 'AM'
    } else {
      type = 'PM'
    }

    if (hour === '13') {
      newHour = '1'
    } else if (hour === '14') {
      newHour = '2'
    } else if (hour === '15') {
      newHour = '3'
    } else if (hour === '16') {
      newHour = '4'
    } else if (hour === '17') {
      newHour = '5'
    } else if (hour === '18') {
      newHour = '6'
    } else if (hour === '19') {
      newHour = '7'
    } else if (hour === '20') {
      newHour = '8'
    } else if (hour === '21') {
      newHour = '9'
    } else if (hour === '22') {
      newHour = '10'
    } else if (hour === '23') {
      newHour = '11'
    } else if (hour === '24') {
      newHour = '12'
    }

    return (`${newHour}:${time[1]}${type}`)

  }

  dateFormat = (datetime) => {
    let dateArr = (datetime.split(/[Ts-s.]+/))
    let date = dateArr.slice(0,1).join().split('-')
    let time = dateArr.slice(1,2).join().split(':')

    let newDate = `${date[1]}/${date[2]}/${date[0]}`
    let newTime = this.timeFormat(time)

    return (`${newDate} at ${newTime}`)
  }

  render() {
    return (
      <Container>
        {this.props.currentGamePlayer ?
          <div>
            <h1>Transaction History</h1>
            {this.renderDropdown()}
            {this.renderTable()}
          </div>
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
    currentGamePlayer: state.currentGamePlayer,
    // currentGame: state.currentGame,
    // games: state.games,
    // users: state.users,
    // gamePlayers: state.gamePlayers,
    activeItem: state.activeItem
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPortfolio: (portfolio) => {
      dispatch({type: "SET_PORTFOLIO", payload: portfolio})
    },
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
    },
    setCurrentGamePlayer: (game_player) => {
      dispatch({type: "SET_CURRENT_GAME_PLAYER", payload: game_player})
    },
    setTransactions: (transactions) => {
      dispatch({type: "SET_TRANSACTIONS", payload: transactions})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)

import React from 'react';
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'
import { Table, Grid, Button } from 'semantic-ui-react'

class Graph extends React.Component {

  state ={
    labels: [],
    data: [],
    label: '',
    stock: null
  }

  numberWithCommas = (x, y) => {
    const floatNum = parseFloat(x).toFixed(y)
    const num = floatNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num
  }

  componentDidMount() {
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.selectedStockTicker.symbol}/chart/1d`)
    .then(res => res.json())
    .then(res => {
      this.props.setData(res.map(chart => chart.close))
      this.props.setLabels(res.map(chart => chart.label))
      this.props.setLabel(this.props.selectedStockTicker.name)

      this.setState({
        data: res.map(chart => chart.close),
        labels: res.map(chart => chart.label),
        label: this.props.selectedStockTicker.name
      })
    })
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.selectedStockTicker.symbol}/quote`)
    .then(res => res.json())
    .then(res => {
      this.props.setStock(res)
      this.setState({
        stock: res
      })
    })
  }

  fetchNewGraph = (timeFrame) => {
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.selectedStockTicker.symbol}/chart/${timeFrame}`)
    .then(res => res.json())
    .then(res => {
      this.props.setData(res.map(chart => chart.close))
      this.props.setLabels(res.map(chart => chart.label))
      this.props.setLabel(this.props.selectedStockTicker.name)
      this.setState({
        data: res.map(chart => chart.close),
        labels: res.map(chart => chart.label),
        label: this.props.selectedStockTicker.name
      })
    })
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.selectedStockTicker.symbol}/quote`)
    .then(res => res.json())
    .then(res => {
      this.props.setStock(res)
      this.setState({
        stock: res
      })
    })
  }

  handleClick = (event) => {
    if (event.target.id === "1d") {
      this.fetchNewGraph("1d")
    } else if (event.target.id === "1m") {
      this.fetchNewGraph("1m")
    } else if (event.target.id === "3m") {
      this.fetchNewGraph("3m")
    } else if (event.target.id === "6m") {
      this.fetchNewGraph("6m")
    } else if (event.target.id === "ytd") {
      this.fetchNewGraph("ytd")
    } else if (event.target.id === "1y") {
      this.fetchNewGraph("1y")
    } else if (event.target.id === "2y") {
      this.fetchNewGraph("2y")
    } else if (event.target.id === "5y") {
      this.fetchNewGraph("5y")
    }
  }

  renderStats = () => {
    const { stock } = this.props
    return (
      <Grid>
        <Grid.Column width={8}>
          <Table basic='very'>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Previous Close</Table.Cell>
                <Table.Cell>${this.numberWithCommas(stock.close, 2)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Open</Table.Cell>
                <Table.Cell>${this.numberWithCommas(stock.open, 2)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Bid</Table.Cell>
                <Table.Cell>{this.numberWithCommas(stock.iexBidPrice, 2)} x {this.numberWithCommas(stock.iexBidSize, 0)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Ask</Table.Cell>
                <Table.Cell>{this.numberWithCommas(stock.iexAskPrice, 2)} x {this.numberWithCommas(stock.iexAskSize, 0)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Day's Range</Table.Cell>
                <Table.Cell>${this.numberWithCommas(stock.low, 2)} - ${this.numberWithCommas(stock.high, 2)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>52 Week Range</Table.Cell>
                <Table.Cell>${this.numberWithCommas(stock.week52Low, 2)} - ${this.numberWithCommas(stock.week52High, 2)}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={8}>
          <Table basic='very'>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Market Cap</Table.Cell>
                <Table.Cell>${this.numberWithCommas(stock.marketCap, 2)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>P/E Ratio</Table.Cell>
                <Table.Cell>{this.numberWithCommas(stock.peRatio, 2)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Sector</Table.Cell>
                <Table.Cell>{stock.sector}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Primary Exchange</Table.Cell>
                <Table.Cell>{stock.primaryExchange}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Volume</Table.Cell>
                <Table.Cell>{this.numberWithCommas(stock.latestVolume, 2)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Average Volume</Table.Cell>
                <Table.Cell>{this.numberWithCommas(stock.avgTotalVolume, 2)}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>

    )
  }

  render() {
    return (
      <div style={{position: "relative"}}>
        <Button id="1d" onClick={this.handleClick}>1d</Button>
        <Button id="1m" onClick={this.handleClick}>1m</Button>
        <Button id="3m" onClick={this.handleClick}>3m</Button>
        <Button id="6m" onClick={this.handleClick}>6m</Button>
        <Button id="ytd" onClick={this.handleClick}>ytd</Button>
        <Button id="1y" onClick={this.handleClick}>1y</Button>
        <Button id="2y" onClick={this.handleClick}>2y</Button>
        <Button id="5y" onClick={this.handleClick}>5y</Button>
        <Line data={
          {labels: this.props.labels,
            datasets: [{
              label: this.props.label,
              backgroundColor: "rgba(75,192,192,0.4)",
              data: this.props.data,
              lineTension: 0.0,
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              pointHoverRadius: 2,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 0,
              pointHitRadius: 2
            }]}
          }
        />
      {this.state.stock ?
        this.renderStats()
        :
        null
      }
        </div>
    )
  }
}

function mapStateToProps(state) {
    return {
      selectedStockTicker: state.selectedStockTicker,
      data: state.data,
      labels: state.labels,
      label: state.label,
      stock: state.stock
    }
  }

function mapDispatchToProps(dispatch) {
  return {
    setSelectedStock: (stockTicker) => {
      // dispatch is our new setState and it takes an object with a type and a payload
      dispatch({type: "SELECTED_STOCK_TICKER", payload: stockTicker})
    }, setTimeFrame: (timeFrame) => {
      dispatch({type: "SET_TIME_FRAME", payload: timeFrame})
    }, setData: (data) => {
      dispatch({type: "SET_DATA", payload: data})
    }, setLabels: (labels) => {
      dispatch({type: "SET_LABELS", payload: labels})
    }, setLabel: (label) => {
      dispatch({type: "SET_LABEL", payload: label})
    }, setStock: (stock) => {
      dispatch({type: "SET_STOCK", payload: stock})
    }

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Graph);

// <Grid>
//   <Grid.Column>
//     <Table.Row>
//       <Table.Cell>
//         <Grid>
//           <Grid.Column width={10}>Previous Close</Grid.Column>
//           <Grid.Column width={6}>{stock.close}</Grid.Column>
//         </Grid>
//       </Table.Cell>
//       <Table.Cell>
//         <Grid>
//           <Grid.Column width={10}>Open</Grid.Column>
//           <Grid.Column width={6}>{stock.open}</Grid.Column>
//         </Grid>
//       </Table.Cell>
//
//     </Table.Row>
//   </Grid.Column>
// </Grid>
//
// <Table.Row>
//   <Table.Cell>
//     <Grid>
//       <Grid.Column width={10}>Bid</Grid.Column>
//       <Grid.Column width={6}>{stock.iexBidPrice} x {stock.iexBidSize}</Grid.Column>
//     </Grid>
//   </Table.Cell>
//   <Table.Cell>Ask {stock.iexAskPrice} x {stock.iexAskSize}</Table.Cell>
//   <Table.Cell>Day's Range {stock.low} - {stock.high}</Table.Cell>
//   <Table.Cell>52 Week Range {stock.week52low} - {stock.week52high}</Table.Cell>
//   <Table.Cell>Volume {stock.latestVolume}</Table.Cell>
//   <Table.Cell>Average Volume {stock.avgTotalVolume}</Table.Cell>
// </Table.Row>
// <Table.Row>
//   <Table.Cell>Market Cap {stock.marketCap}</Table.Cell>
//   <Table.Cell>P/E Ratio {stock.peRatio}</Table.Cell>
//   <Table.Cell>Sector {stock.sector}</Table.Cell>
//   <Table.Cell>Primary Exchange {stock.primaryExchange}</Table.Cell>
// </Table.Row>
//

import React from 'react';
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'

class Graph extends React.Component {

  state ={
    labels: [],
    data: [],
    label: ''
  }

  componentDidMount() {
    console.log("in graph", this.props.selectedStockTicker);
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.selectedStockTicker.symbol}/chart/1d`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        data: res.map(chart => chart.close),
        labels: res.map(chart => chart.label),
        label: this.props.selectedStockTicker.name
      })
    })
  }

  fetchNewGraph = (timeFrame) => {
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.selectedStockTicker.symbol}/chart/${timeFrame}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        data: res.map(chart => chart.close),
        labels: res.map(chart => chart.label),
        label: this.props.selectedStockTicker.name
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

  render() {
    return (
      <div style={{position: "relative"}}>
        <button id="1d" onClick={this.handleClick}>1d</button>
        <button id="1m" onClick={this.handleClick}>1m</button>
        <button id="3m" onClick={this.handleClick}>3m</button>
        <button id="6m" onClick={this.handleClick}>6m</button>
        <button id="ytd" onClick={this.handleClick}>ytd</button>
        <button id="1y" onClick={this.handleClick}>1y</button>
        <button id="2y" onClick={this.handleClick}>2y</button>
        <button id="5y" onClick={this.handleClick}>5y</button>
        <Line data={
            {labels: this.state.labels,
            datasets: [{
                label: this.state.label,
                backgroundColor: "rgba(75,192,192,0.4)",
                data: this.state.data,
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
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
      selectedStockTicker: state.selectedStockTicker
    }
  }

export default connect(mapStateToProps)(Graph);

//

// chart: {
//   labels: res.map(chart => chart.label),
//   datasets: [{
//       label: title,
//       backgroundColor: "rgba(75,192,192,0.4)",
//       data: res.map(chart => chart.close),
//       lineTension: 0.0,
//       fill: false,
//       borderColor: "rgba(75,192,192,1)",
//       pointHoverRadius: 2,
//       pointHoverBackgroundColor: "rgba(75,192,192,1)",
//       pointHoverBorderColor: "rgba(220,220,220,1)",
//       pointHoverBorderWidth: 2,
//       pointRadius: 0,
//       pointHitRadius: 2
//   }]
// }

// {
//   labels: this.state.labels,
//   datasets: [
//     {
//       label: this.state.label,
//       backgroundColor: "rgba(355, 0, 255, 0.75)",
//       data: this.state.data
//     }
//   ]
// }

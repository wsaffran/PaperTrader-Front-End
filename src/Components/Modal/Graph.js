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
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.selectedStockTicker.symbol}/chart/1y`)
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
    }
  }

  render() {
    return (
      <div style={{position: "relative", width: 600, height: 550 }}>
        <button id="1d" onClick={this.handleClick}>1d</button>
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

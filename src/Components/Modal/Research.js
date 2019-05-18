import React from 'react';
import { connect } from 'react-redux'
import symbols from './symbols'
// import './Modal.css';
import Autocomplete from "./Autocomplete.jsx";
import Graph from './Graph'
// import ModalDisplay from './ModalDisplay'
import { Button, Icon, Header, Modal } from 'semantic-ui-react'

class Research extends React.Component {

  render() {
    return (
      <div id="inResearch">
        <Modal.Description>
        <div style={{marginBottom: "50px"}}>
          <Autocomplete
            suggestions={
              symbols.map(symbol => {
                return `${symbol.symbol} - ${symbol.name}`
              })
            }
          />
        </div>

        </Modal.Description>

        {this.props.selectedStockTicker ? <Graph/> : null}

        <Modal.Description>
          <Header>{this.props.selectedStockTicker.symbol}</Header>
          <p>{this.props.selectedStockTicker.name}</p>

        </Modal.Description>
      </div>
    )
  }

}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      currentGame: state.currentGame,
      selectedStockTicker: state.selectedStockTicker
    }
  }

export default connect(mapStateToProps)(Research);

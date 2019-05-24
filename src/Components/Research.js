import React from 'react';
import { connect } from 'react-redux'
import symbols from './symbols'
import Autocomplete from "./Autocomplete.jsx";
import Graph from './Graph'
import { Header, Modal, Button, Icon } from 'semantic-ui-react'
// import './Modal.css';
// import ModalDisplay from './ModalDisplay'

class Research extends React.Component {

  handleClick = () => {
    this.props.closeModal()
  }

  render() {
    return (
      <div id="inResearch">
        <Modal.Content image scrolling>
          <Modal.Description>
          <div style={{marginBottom: "70px"}}>
            <Autocomplete
              suggestions={
                symbols.map(symbol => {
                  return `${symbol.symbol} - ${symbol.name}`
                })
              }
            />
          </div>
          {this.props.selectedStockTicker ? <Graph/> : null}
          <Header>{this.props.selectedStockTicker.symbol}</Header>
          <p>{this.props.selectedStockTicker.name}</p>

          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <div>
            <Button primary onClick={() => this.handleClick()}>
              Back <Icon name='chevron right' />
            </Button>
            <Button primary onClick={() => this.props.handleClick('transact')}>
              Transact <Icon name='chevron right' />
          </Button>
          </div>
        </Modal.Actions>
      </div>
    )
  }

}

function mapStateToProps(state) {
    return {
      // currentUser: state.currentUser,
      // currentGame: state.currentGame,
      selectedStockTicker: state.selectedStockTicker
    }
  }

export default connect(mapStateToProps)(Research);

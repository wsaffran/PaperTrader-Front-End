import React from 'react';
import { connect } from 'react-redux'
import symbols from './symbols'
import Autocomplete from "./Autocomplete.jsx";
import Graph from './Graph'
import { Modal, Button, Icon, Container } from 'semantic-ui-react'
// import './Modal.css';
// import ModalDisplay from './ModalDisplay'

class Research extends React.Component {

  handleStockChange = (stock) => {
    this.setState({
      ticker: stock.symbol
    })
  }

  handleClick = () => {
    this.props.closeModal()
  }

  render() {
    console.log(this.props.stock);
    return (
      <div id="inResearch">
        <Container style={{padding: '10px'}}>
          <Modal.Content scrolling >
            <Modal.Description>
              <div style={{marginBottom: "20px"}}>
                <Autocomplete
                  suggestions={
                    symbols.map(symbol => {
                      return `${symbol.symbol} - ${symbol.name}`
                    })
                  }
                  />
              </div>
              {this.props.selectedStockTicker ?
                <div>
                  {this.props.stock ?
                    <h1 style={{marginLeft: '75px'}}>{this.props.stock.companyName}
                      <span style={{fontSize: '25px', fontWeight: '300px'}}>&nbsp;&nbsp;&nbsp;${this.props.stock.latestPrice}</span>
                      {this.props.stock.change >= 0 ?
                        <span style={{fontSize: '20px', fontWeight: '300px', color: 'green'}}>&nbsp;&nbsp;&nbsp;{this.props.stock.change} ({this.props.stock.changePercent})</span>
                        :
                        <span style={{fontSize: '20px', fontWeight: '300px', color: 'red'}}>&nbsp;&nbsp;&nbsp;{this.props.stock.change} ({this.props.stock.changePercent})</span>
                      }
                    </h1>
                    :
                    <h1 style={{marginLeft: '75px'}}>{this.props.selectedStockTicker.name}</h1>
                  }

                  <Graph />
                </div>
                :
                null
              }

            </Modal.Description>
          </Modal.Content>
          <Modal.Actions style={{marginLeft: '57px'}}>
            <div style={{margin: '20px'}}>
              <Button primary onClick={() => this.handleClick()}>
                <Icon name='chevron left' />Back
            </Button>
            {this.props.selectedStockTicker ?
              <Button primary onClick={() => this.props.handleClick('transact')}>
                Transact <Icon name='chevron right' />
              </Button>
              :
              <Button disabled primary onClick={() => this.props.handleClick('transact')}>
                Transact <Icon name='chevron right' />
              </Button>
            }
            </div>
          </Modal.Actions>
        </Container>
      </div>
    )
  }

}

function mapStateToProps(state) {
    return {
      // currentUser: state.currentUser,
      // currentGame: state.currentGame,
      selectedStockTicker: state.selectedStockTicker,
      stock: state.stock
    }
  }

export default connect(mapStateToProps)(Research);

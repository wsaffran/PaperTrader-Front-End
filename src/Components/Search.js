import React from 'react';
import { connect } from 'react-redux'
// import './Modal.css';
// import Autocomplete from "./Autocomplete.jsx";
import Research from './Research'
import Transact from './Transact'
// import Graph from './Graph'
import { Button, Modal, Container } from 'semantic-ui-react'

class Search extends React.Component {

  state = {
    status: 'research',
    showModal: false,
    labels: [],
    data: [],
    label: ''
  }

  handleClick = (action) => {
    this.setState({
      status: action
    })
  }

  closeModal = () => {
    this.props.setSelectedStock('')
    this.setState({
      showModal: false,
      status: 'research',
      labels: [],
      data: [],
      label: ''
    })
  }


  render() {
    return (
      <Container >
        <Modal className='modal' onClose={this.closeModal} open={this.state.showModal} trigger={<Button onClick={() => this.setState({showModal: true})}>Search</Button>}>
          <Modal.Header>Search</Modal.Header>
          <Modal.Content>
            {
              this.state.status === 'research' ?
              <Research closeModal={this.closeModal} handleClick={this.handleClick} labels={this.state.labels} data={this.state.data} label={this.state.label}/>
              :
              <Transact closeModal={this.closeModal} handleClick={this.handleClick} history={this.props.history} portfolio={this.props.portfolio}/>
            }
          </Modal.Content>
        </Modal>
    </Container>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedStock: (stockTicker) => {
      // dispatch is our new setState and it takes an object with a type and a payload
      dispatch({type: "SELECTED_STOCK_TICKER", payload: stockTicker})
    }
  }
}

// function mapStateToProps(state) {
//     return {
//       currentUser: state.currentUser,
//       currentGame: state.currentGame,
//       currentGamePlayer: state.currentGamePlayer,
//       selectedStockTicker: state.selectedStockTicker
//     }
//   }

export default connect(null, mapDispatchToProps)(Search);

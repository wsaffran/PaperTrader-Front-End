import React from 'react';
import { connect } from 'react-redux'
// import './Modal.css';
// import Autocomplete from "./Autocomplete.jsx";
import Research from './Modal/Research'
import Transact from './Modal/Transact'
// import Graph from './Graph'
import { Button, Modal } from 'semantic-ui-react'

class Search extends React.Component {

  state = {
    status: 'research',
    showModal: false
  }

  handleClick = (action) => {
    this.setState({
      status: action
    })
  }

  closeModal = () => {
    this.setState({showModal: false})
  }


  render() {
    return (
      <>
      <h3>Search</h3>
      <Modal className='modal' onClose={this.closeModal} open={this.state.showModal} trigger={<Button onClick={() => this.setState({showModal: true})}>Search</Button>}>
        <Modal.Header>Search</Modal.Header>
        <Modal.Content>
          {
            this.state.status === 'research' ?
            <Research closeModal={this.closeModal} handleClick={this.handleClick}/>
            :
            <Transact closeModal={this.closeModal} handleClick={this.handleClick}/>
          }
        </Modal.Content>
      </Modal>
      </>
    )
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

export default connect()(Search);

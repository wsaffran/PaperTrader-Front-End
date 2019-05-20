import React from 'react';
import { connect } from 'react-redux'
// import './Modal.css';
// import Autocomplete from "./Autocomplete.jsx";
import Research from './Research'
import Transact from './Transact'
// import Graph from './Graph'
import { Button, Modal } from 'semantic-ui-react'

class ModalDisplay extends React.Component {

  state = {
    query: '',
    status: 'research'
  }

  handleClick = (action) => {
    this.setState({
      status: action
    })
  }


  render() {
    return (
      <Modal trigger={<Button>Search</Button>}>
        <Modal.Header>Search</Modal.Header>
        <Modal.Content>
          {
            this.state.status === 'research' ?
            <Research handleClick={this.handleClick}/>
            :
            <Transact handleClick={this.handleClick}/>
          }
        </Modal.Content>
      </Modal>
    )
  }

}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
      currentGame: state.currentGame,
      currentGamePlayer: state.currentGamePlayer,
      selectedStockTicker: state.selectedStockTicker
    }
  }

export default connect(mapStateToProps)(ModalDisplay);

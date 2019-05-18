import React from 'react';
import { connect } from 'react-redux'
// import symbols from './symbols'
// import './Modal.css';
// import Autocomplete from "./Autocomplete.jsx";
// import Graph from './Graph'
import ModalDisplay from './ModalDisplay'
// import { Modal } from 'semantic-ui-react'

class SearchModal extends React.Component {

  state = {
    query: '',
  }

  handleClick = (action) => {
    this.setState({
      status: action
    })
  }

  render() {
    return (
      <ModalDisplay handleClick={this.handleClick}/>
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

export default connect(mapStateToProps)(SearchModal);

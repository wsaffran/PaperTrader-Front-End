import React from 'react';
import { connect } from 'react-redux'
// import './Modal.css';
// import Autocomplete from "./Autocomplete.jsx";
import Research from './Research'
import Transact from './Transact'
// import Graph from './Graph'
import { Button, Icon, Modal } from 'semantic-ui-react'

class ModalDisplay extends React.Component {

  state = {
    query: '',
    status: 'research'
  }

  handleClick = (action) => {
    this.setState({
      status: action
    }, () => {
      if (action === 'research') {
        fetch('')
      }
    })
  }


  render() {
    return (
      <Modal trigger={<Button>Search</Button>}>
        <Modal.Header>Search</Modal.Header>
        <Modal.Content image scrolling>
          {
            this.state.status === 'research' ?
            <Research />
            :
            <Transact />
          }
        </Modal.Content>
        <Modal.Actions>

          {
            this.state.status === 'research' && this.props.selectedStockTicker ?
              <Button primary onClick={() => this.handleClick('transact')}>
              Transact <Icon name='chevron right' />
              </Button>
            :
              <Button primary onClick={() => this.handleClick('research')}>
              Buy <Icon name='chevron right' />
              </Button>

          }
        </Modal.Actions>
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

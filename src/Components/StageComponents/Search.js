import React from 'react'
import { connect } from 'react-redux'
// import symbols from './symbols.js'
import SearchModal from '../Modal/SearchModal';


class Search extends React.Component {

  state = {
    isShowing: false
  }

  openModalHandler = () => {
    this.setState({
      isShowing: true
    });
  }

  closeModalHandler = () => {

    this.setState({
      isShowing: false
    });
  }

  render () {
    return (
      <div>
        <SearchModal
          className="modal"
          show={this.state.isShowing}
          close={this.closeModalHandler}>
        </SearchModal>

      </div>
    );
  }

}

function mapStateToProps(state) {
    return {
      currentUser: state.currentUser
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


export default connect(mapStateToProps, mapDispatchToProps)(Search)

// OLD SEARCH MODAL




// state = {
//   query: ''
// }
//
// openModalHandler = () => {
//     this.setState({
//         isShowing: true
//     });
// }
//
// closeModalHandler = () => {
//     this.setState({
//         isShowing: false
//     });
// }
//
//
// // createDataList = () => {
// //   return symbols.map(symbol => {
// //     return <option value={symbol.symbol}>
// //   })
// // }
//
// handleChange = (event) => {
//   this.setState({
//     query: event.target.value
//   })
// }
//
// handleSubmit = (event) => {
//   event.preventDefault()
// }
//
// render () {
//   return (
//     <form>
//       <input onChange={this.handleChange} type="text" name="query" value={this.state.query}/>
//     </form>
//   )
// }
// }
//

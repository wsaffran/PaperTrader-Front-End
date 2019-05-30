import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import symbols from './symbols'
import { Input, Form } from 'semantic-ui-react'

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    this.props.setSelectedStock(symbols.find(symbol => {
      return symbol.symbol === e.currentTarget.innerText.split(' ')[0]
    }))
    let currSymbol = symbols.find(symbol => {
      return symbol.symbol === e.currentTarget.innerText.split(' ')[0]
    })

    fetch(`https://api.iextrading.com/1.0/stock/${currSymbol.symbol.toLowerCase()}/chart/1d`)
    .then(res => res.json())
    .then(res => {
      this.props.setData(res.map(chart => chart.close))
      this.props.setLabels(res.map(chart => chart.label))
      // this.props.setLabel(this.props.selectedStockTicker.name)
    })
    fetch(`https://api.iextrading.com/1.0/stock/${currSymbol.symbol}/quote`)
    .then(res => res.json())
    .then(res => {
      this.props.setStock(res)
      this.props.setOld(res.latestPrice - res.change)

    })

  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
          </div>
        );
      }
    }

    return (
      <Fragment>
        <Form style={{marginLeft: '75px'}}>
          <Input

          className='input-dropdown'
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          />
          {suggestionsListComponent}
        </Form>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedStock: (stockTicker) => {
      // dispatch is our new setState and it takes an object with a type and a payload
      dispatch({type: "SELECTED_STOCK_TICKER", payload: stockTicker})
    }, setTimeFrame: (timeFrame) => {
      dispatch({type: "SET_TIME_FRAME", payload: timeFrame})
    }, setData: (data) => {
      dispatch({type: "SET_DATA", payload: data})
    }, setLabels: (labels) => {
      dispatch({type: "SET_LABELS", payload: labels})
    }, setLabel: (label) => {
      dispatch({type: "SET_LABEL", payload: label})
    }, setStock: (stock) => {
      dispatch({type: "SET_STOCK", payload: stock})
    }, setOld: (old) => {
      dispatch({type:"SET_OLD", payload: old})
    }

  }
}

export default connect(null, mapDispatchToProps)(Autocomplete);

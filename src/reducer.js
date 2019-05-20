const defaultState = {
  currentUser: null,
  currentGame: null,
  currentGamePlayer: null,
  games: [],
  gamePlayers: [],
  users: [],
  selectedStockTicker: '',
  activeItem: 'yourGames',
  currentGameId: null
}

function reducer(state = defaultState, action){
  switch(action.type){
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "SET_CURRENT_GAME":
      return {...state, currentGame: action.payload}
    case "SET_GAMES":
      return {...state, games: action.payload}
    case "SET_GAME_PLAYERS":
      return {...state, gamePlayers: action.payload}
    case "SET_USERS":
      return {...state, users: action.payload}
    case "UPDATE_GAME_PLAYERS":
      return {...state, gamePlayers: [...state.gamePlayers, action.payload]}
    case "SELECTED_STOCK_TICKER":
      return {...state, selectedStockTicker: action.payload}
    case "SET_CURRENT_GAME_PLAYER":
      return {...state, currentGamePlayer: action.payload}
    case "UPDATE_GAMES":
      return {...state, currentGamePlayer: [...state.games, action.payload]}
    case "UPDATE_ACTIVE_ITEM":
      return {...state, activeItem: action.payload}
    case "SET_CURRENT_GAME_ID":
      return {...state, currentGameId: action.payload}


    default:
      return state
  }
}

export default reducer

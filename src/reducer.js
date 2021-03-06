const defaultState = {
  currentUser: null,
  currentGame: null,
  currentGamePlayer: null,
  games: [],
  gamePlayers: [],
  users: [],
  selectedStockTicker: '',
  activeItem: 'yourGames',
  currentGameId: null,
  isModalShowing: false,
  portfolio: null,
  rankings: [],
  timeFrame: '1d',
  data: [],
  labels: [],
  label: '',
  stock: null,
  transactions: []
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
    case "SET_MODAL_DISPLAY":
      return {...state, isModalShowing: action.payload}
    case "SET_PORTFOLIO":
      return {...state, portfolio: action.payload}
    case "UPDATE_PORTFOLIO":
      return {...state, portfolio: [...state.portfolio, action.payload]}
    case "UPDATE_RANKINGS":
      return {...state, rankings: [...state.rankings, action.payload]}
    case "SET_RANKINGS":
      return {...state, rankings: action.payload}
    case "SET_TIME_FRAME":
      return {...state, timeFrame: action.payload}
    case "SET_DATA":
      return {...state, data: action.payload}
    case "SET_LABELS":
      return {...state, labels: action.payload}
    case "SET_LABEL":
      return {...state, label: action.payload}
    case "SET_STOCK":
      return {...state, stock: action.payload}
    case "SET_TRANSACTIONS":
      return {...state, transactions: action.payload}

    default:
      return state
  }
}

export default reducer

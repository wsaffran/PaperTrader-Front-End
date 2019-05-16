const defaultState = {
  currentUser: null,
  currentGame: null,
  games: [],
  gamePlayers: [],
  users: []
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

    default:
      return state
  }
}

export default reducer

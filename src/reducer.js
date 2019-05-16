const defaultState = {
  currentUser: null,
  currentGame: null
}

function reducer(state = defaultState, action){
  switch(action.type){
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "SET_CURRENT_GAME":
      return {...state, currentGame: action.payload}
    default:
      return state
  }
}

export default reducer

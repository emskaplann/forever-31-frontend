const initialState = {}

const userReducer = (oldState = initialState, action) => {

  switch (action.type) {
    case 'ADD_USER_AUTH': // adding user token and id to redux store when they log in
      return action.user;
    case 'ADD_ADDRESS':
      return {...oldState.user, address: action.address}
    case 'CLEAR_USER_AUTH': // cleaning saved user token and id when they log out
      return {}
    default:
      return oldState;
    }
  }

export default userReducer;

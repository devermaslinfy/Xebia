// import ACTIONS  from '../action-creaters/login-actions';

// function userDataReducer(state={user : {}, planets :[]}, action){
//     switch(action.type) {
//         case ACTIONS.Types.ADD_USER:
//           return Object.assign({}, state, 
//               {
//                 user: action.payload
//               });
//         case ACTIONS.Types.ADD_PLANETS:
//             return Object.assign({}, state,
//               {
//                 user: [...state.planets, ...action.payload]
//               });
//          default: 
//            return state;
//      }
// }

// export default userDataReducer;

export function loginReducer(state = {
  loginBtnEnabledStatus: true,
  errMsg: '',
  userDetails: '',
}, action) {
  let latestState = {};
  switch (action.type) {
    case 'TOGGLE_LOGIN_BTN_STATUS':
      latestState = { ...state, loginBtnEnabledStatus: action.status };
      break;
    case 'LOGIN_ERROR_MESSAGE':
      latestState = { ...state, errMsg: action.message };
      break;
    case 'LOGGEDIN_USER_DETAILS_SAVE':
      latestState = { ...state, userDetails: action.details };
      break;
    default:
      latestState = state;
  }

  return latestState;
};
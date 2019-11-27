
// const Types = {
//    ADD_USER: "ADD_USER",
//    ADD_PLANETS : "ADD_PLANETS"

//  };

//  // actions
//  const addUser = user => ({
//    type: Types.ADD_USER,
//    payload: user
//  });

//  const addPlanets = planets => ({
//    type: Types.ADD_PLANETS,
//    payload: planets
//  });
 

 
//  export default {
//    addUser,
//    addPlanets,
//    Types
//  };

 import actions from '../action-types';
 import swAxiosInstance from '../../assets/configs/api';


 export function toggleLoginBtnStatus(status) {
   return {
     type: actions.TOGGLE_LOGIN_BTN_STATUS,
     status,
   }
 }
 
 export function loginErrorMessageAction(message) {
   return {
     type: actions.LOGIN_ERROR,
     message,
   }
 }
 
 export function loggedInUserDetailsSave(details) {
   return {
     type: actions.SAVE_USER_DETAILS,
     details,
   }
 }
 
 export function loginAction(props, username, password) {
   return (dispatch, getState) => {
     swAxiosInstance.get('people/?search=' + username)
       .then(function (userDetails) {
         let users = userDetails.data.results, userFound = false;
         if (users.length === 0) {
           dispatch(loginErrorMessageAction("No users found with the name of " + username));
         } else {
           users.forEach((user, index) => {
             if (user.name === username &&  user.birth_year === password) {
               dispatch(loggedInUserDetailsSave(user));
               props.history.push('/planets');
               userFound = true;
             }
           });
           if (!userFound) {
             dispatch(loginErrorMessageAction("Please check your username or password"));
           }
         }
         dispatch(toggleLoginBtnStatus(true));
       })
       .catch(function (error) {
         dispatch(loginErrorMessageAction(error));
         dispatch(toggleLoginBtnStatus(true));
       });
     };
 }
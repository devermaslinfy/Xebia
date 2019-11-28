import React from 'react';
import { Provider } from 'react-redux';
import Login from '../src/components/login/login';
import { mount, shallow } from 'enzyme';
import Planets from './components/planet/planet-component';
import { configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import * as actions  from './store/action-creaters/login-actions';
import {actionTypes } from './store/action-types';


import configureMockStore from "redux-mock-store";

configure({ adapter: new Adapter() });

describe('rendering', () => {
  const store = configureMockStore();
  const mockState = {
    loginReducer: {
      loginBtnEnabledStatus: true,
      errMsg: "Error",
      userDetails : ''
    }
  };
  it('renders without crashing', () => {

    const mockStore = store(mockState);
    const component = mount(
      <Provider store={mockStore}>
        <Login />
      </Provider>
    );
    expect(toJson(component)).toMatchSnapshot();  
  });
  
  it('plantes renders without crashing', () => {

  const mockStore = store(mockState);
  const component = mount(
    <Provider store={mockStore}>
      <Planets />
    </Provider>
  );
  expect(toJson(component)).toMatchSnapshot();  
  });

  it('should create an action to toggle login button status', () => {
    const toggleStatus = false;
    const expectedAction = {
      type: actionTypes.TOGGLE_LOGIN_BTN_STATUS,
      status: toggleStatus
    }
    expect(actions.toggleLoginBtnStatus(toggleStatus)).toEqual(expectedAction)

  });

  it('should create an action to store login error message', () => {
    const loginErrorMessage = 'Username does not exist';
    const expectedAction = {
      type: actionTypes.LOGIN_ERROR,
      message: loginErrorMessage
    }
    expect(actions.loginErrorMessageAction(loginErrorMessage)).toEqual(expectedAction)
  });

  it('should create an action to save logged in user details', () => {
    const userDetails = {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
    };
    const expectedAction = {
      type: actionTypes.SAVE_USER_DETAILS,
      details: userDetails,
    }
    expect(actions.loggedInUserDetailsSave(userDetails)).toEqual(expectedAction)
  });

});

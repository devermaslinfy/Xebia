import React, {useState} from 'react';
import './login.css';
import PropTypes from 'prop-types';  
import Auth from '../../common/authenticate';
import { connect } from "react-redux";
import {toggleLoginBtnStatus,
  loginAction}  from '../../store/action-creaters/login-actions';
const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // remove all existing localstorage data
    Auth.logout();

    const changeUserName = (event) => {
        let value = event.target.value;
        setUserName(value)
    }

    const changePassword = (event) => {
        let value = event.target.value;
        setPassword(value)
    }

    const submit = (event) => {
        event.preventDefault();
        props.dispatch(toggleLoginBtnStatus(false));
        props.dispatch(loginAction(props, userName, password));
    }
    return(
    <form  className = "form" onSubmit={submit}>
    <div className="flex-item err">{props.errMsg}</div>
    <div className="break"></div>

    <div className = "flex-item">
        <label htmlFor="username">Enter username</label>
        <input required  onChange={changeUserName}  type="text" placeholder="Enter Your Username" name="username" />
    </div>
    <div className="break"></div>

    <div className = "flex-item">
        <label htmlFor="password">Enter password</label>
        <input required  onChange={changePassword}  type="password" placeholder="Enter Your Password" name="password" />
    </div>
    <div className="break"></div>

    <div className = "btn-flex">
    <input  disabled={ props.loginBtnEnabledStatus === false ? "disabled" : "" } type="submit" value="Submit" />
    </div>
    </form>
    );
}

Login.propTypes = {
    handleSubmit : PropTypes.func
};
const mapStateToProps = state => ({
  loginBtnEnabledStatus : state.loginReducer.loginBtnEnabledStatus,
  errMsg : state.loginReducer.errMsg
});

export default connect(mapStateToProps)(Login);
import React, {useState} from 'react';
import './login.css';
import PropTypes from 'prop-types';  
import request from '../../common/service';
const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, seErrMsg] = useState(false);

    // set localstorage islogged false on redirect;
    localStorage.setItem('isLogged', false);
    localStorage.removeItem('userDetail');

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
        const url = 'people/?search=' + userName;
        request.get(url)
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result);
              result = result.results;
              if (result.length === 0) {
                const err = "No users found with the name of " + userName;
                seErrMsg(err);
              } else {
                result.forEach((user, index) => {
                  if (user.name === userName &&  user.birth_year === password) {
                    //seErrMsg('');
                    localStorage.setItem('isLogged', true);
                    localStorage.setItem('userDetail', JSON.stringify(user));
                    props.history.push('/planets');
                  }
                });
              }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error);
           });
    }
    return(
    <form  className = "form" onSubmit={submit}>
    <div className="flex-item err">{errMsg}</div>
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
    <input  type="submit" value="Submit" />
    </div>
    </form>
    );
}

Login.propTypes = {
    handleSubmit : PropTypes.func
};

export default Login;
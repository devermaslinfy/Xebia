import React from 'react';
import  './search-box.css'
export default class SearchBox extends React.Component {
  constructor() {
    super();
    this.state = {
      timerSet: false,
      searchCount: 0,
      errorMessage: '',
      searchThresholdInSeconds: 60,
    }
    this.userDetail =  JSON.parse(localStorage.getItem('userDetail'));

  }

  setTimer() {
    this.timer = setTimeout(() => {
      clearTimeout(this.timer);
      this.setState({
        searchCount: 0,
        errorMessage: '',
        timerSet: false,
      });
    }, 1000 * this.state.searchThresholdInSeconds);
  }

  throttle = (func, limit) => {
    let inThrottle
    return function() {
      const args = arguments;
      const context = this;
      let timer;
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        timer = setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  searchPlanets = (e) => {
    // let { store } = this.context, storeData = store.getState();
    let userDetail =  JSON.parse(localStorage.getItem('userDetail'));

    if (this.state.timerSet === false) {
      this.state.timerSet = true;
      this.setTimer();
    }

    if (userDetail.name !== "Luke Skywalker") {
      if ( this.timer && this.state.searchCount <= 15 ) {
        this.props.search(e.target.value);
        this.setState({ searchCount: this.state.searchCount+1 });
      }

      if (this.state.searchCount === 16) {
        this.props.search('');
        this.state.errorMessage = 'You are not allowed to perform more than 15 searches per minute';
        this.setState({ searchCount: this.state.searchCount+1 });
      }
    } else {
      this.props.search(e.target.value);
    }
  }

  render() {
    return (
      <div className="col-md-12 col-sm-12 serach-container  no-padding">
        <input
          className="col-md-12 col-sm-12 search-box"
          placeholder="Search for the planets"
          onKeyUp={this.searchPlanets}
        />
        <span className="error">
          { this.state.errorMessage }
        </span>
      </div>
    )
  }
}
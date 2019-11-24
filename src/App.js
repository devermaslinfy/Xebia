
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import LoginComponent from './components/login/login';
import PlanetsComponent from './components/planet/planet-component';


class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={LoginComponent} />
            <Route path="/planets" component={PlanetsComponent} />
          </div>
        </Router>
    )
  }
}


export default App
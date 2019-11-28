
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Layout from './layout/layout';
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
          <Layout>          
            <Route exact path="/" component={LoginComponent} />
            <Route path="/planets" component={PlanetsComponent} />
          </Layout>

        </Router>
    )
  }
}


export default App;
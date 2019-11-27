import React from 'react';
import SearchBox from '../searchBox/search-box-component';
import './planet.css';
import request from '../../common/service';
import { connect } from "react-redux";
// import ACTIONS  from '../../store/action-creaters/login-actions';


import {
  randomColor,
  populationFormatConverter,
} from '../../assets/utilities/planet-utilities.js';

class Planets extends React.Component {
    constructor() {
      super();
      this.state = {
        planets: [],
        allPlanets : [],
        maxPopulation: 0,
        searchKeyword: '',
      }
      //this.islogged = localStorage.getItem('isLogged');
      //this.userDetail = JSON.parse(localStorage.getItem('userDetail'));

    }

    search = (searchTerm) => {
      this.setState({ searchKeyword: searchTerm });
      // if(searchTerm && searchTerm.trim()) {
      //   let planets = this.state.allPlanets.filter((obj) => {
      //     return obj.name === searchTerm;
      //   })
      //   this.setState({ planets: [ ...this.state.planets, ...planets ] });
  
      // } else {
      //   this.setState({ planets: [ ...this.state.planets, ...this.state.allPlanets ] });
      // }
      //this.setState({ planets: [ ...this.state.planets, ...this.props.planets ] });


    }

    async fetchPlanets(page) {
      let max = 0, pageNo = page;
      let response = await request.get('planets/?page=' + pageNo);
      let json = await response.json();
      while(json && json.results && json.next != null) {
        //this.setState({ allPlanets: [ ...this.state.allPlanets, ...json.results ] });
        this.setState({ planets: [ ...this.state.planets, ...json.results ] });
        response = await request.get('planets/?page=' + ++pageNo);
        json = await response.json();
  
      }
      //this.props.dispatch(ACTIONS.addPlanets(this.state.planets));



      this.state.planets.forEach(function (planet) {
        if (planet.population != "unknown") {
          if (parseInt(planet.population, 10) > max) {
            max = parseInt(planet.population, 10);
          }
        }
      });
      this.setState({ maxPopulation: max });
    }

    componentDidMount() {
      console.log(this.props);
      console.log(this.props.userDetail);

      // if(!this.islogged) {
      //   this.props.history.push('/');
      // } else {
      //   this.fetchPlanets(1);
      // }
      this.fetchPlanets(1);

    }

    render() {
      let state = this.state;

      return (
        <div className="col-md-12 col-sm-12 no-padding planets-component">
          <SearchBox search={this.search} />

          <div className="loggedin-user">
            { this.props.userDetail ?  'Logged In User '+ this.props.userDetail.name : ''}
          </div>

          <div className="note">
            Note:
            <br />
            Some of the planets are having population in billions and some of them are in thousands.
            Due to that its difficult to show the significant difference in size between two planets.

            <p className="problem">
              The problem is:
              <br/>
              I have set maximum width of 450px for a larger planet. Thats for a planet having 1000.0 Billion population.
              <br/>
              Due to that for the planets having 1000 population, the size of the div will be too smaller,
            </p>

            <p className="solution">
              Below is my solution for the Above Problem:
              <br/>
              so i have decided to set default 100px for all the planets, and then i will calculate the actual size
              of the planet from 350px by using this formula
              <br/>
              (
                i.e. -> currentPlanetPopulation / highestPopulationOfTheAvailablePlanets ( i.e 1000 Billions, planet-name: Coruscant )
              )
              <br />
              and combine the above width with the 100px width.
              <br /><br />
              This solution gives much much smaller planets to display its detail in the div.(like planet name,
              planet population).
            </p>
          </div>

          <div className="planets-container">
            {
              this.state.planets.map(function (planet, index) {
                if (planet.name.toLowerCase().indexOf(state.searchKeyword.toLowerCase()) != -1) {
                  return (
                    <div
                      style={{
                        width: planet.population === 'unknown' ? 100 : 100 + ( 350 * ( parseInt(planet.population, 10)  / state.maxPopulation ) ) + 'px',
                        background: randomColor(),
                      }}
                      className="planets"
                      title={ 'Planet Name: ' + planet.name + '; Planet Population: ' + planet.population }
                      key={index}
                    >
                      <span className="planet-name">
                        { planet.name }
                      </span>
                      <span className="planet-population">
                        { populationFormatConverter(planet.population) }
                      </span>
                    </div>
                  );
                } else {
                  return null;
                }
              }).filter(function (updatedPlanet) {
                if (updatedPlanet !== null) {
                  return true;
                }

                return false;
              })
            }
          </div>
        </div>
      )
    }
};

// Planets.contextTypes = {
//   store: PropTypes.object
// };
const mapStateToProps = state => ({
  userDetail : state.loginReducer.userDetails,
});

export default connect(mapStateToProps)(Planets);;
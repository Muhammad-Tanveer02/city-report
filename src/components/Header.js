import React, {Component} from 'react'

//image requirement
import compassImage from "../map_compass.jpg";

class Header extends Component{
  render(){
    return(
      <div>
        <div className="jumbotron jumbotron-heading">
          <div className="container d-flex container-heading">
              <div  className="col-sm-8">
                <h1 className="display-4">The City Report</h1>
                <p className="sub">A project by Muhammad Tanveer</p>
                <p className="lead">There's an immense number of cities in the world, each with their own political, social, and economic traits, with which their quality of life is determined. This app priovides information about that!</p>
              </div>
              <div className="ml-auto p-2 img-compass col-sm-4">
                <img className="img rounded img-thumbnail" src={compassImage} alt="cannot be diplayed."></img>
              </div>
          </div>
        </div>
        <div className="jumbotron jumbotron-info">
          <div className="container d-flex container-info">
            <div>
              <p className="lead">1. Search for a city below to begin. Please note that not all cities contain this information yet. Please be as specific as possible!</p>
              <p className="lead">2. You will be presented with a list of cities that match your search, please select your choice.</p>
              <p className="lead">3. Below, you will find basic information, as well as statistics regarding quality of life and salaries, and an interactive map of each city for you to play around with! </p>
            </div>
          </div>
        </div>
        <div className="card note-card">
          <p className="card-body notecard-text text-center">Cities are grouped into Urban Areas and displays their information. Not all cities have been grouped and do not contain all information yet.</p>
        </div>
      </div>
    );
  }
}

export default Header
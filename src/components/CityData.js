import axios from 'axios'
import React, { Component } from "react";
import UrbanScores from './UrbanScores';
import UrbanSalaries from './UrbanSalaries';
import Flag from './Flag';
import { ReactBingmaps } from 'react-bingmaps';
require("dotenv").config();

class CityData extends Component{

        constructor(props) {
        super(props);
        this.state = {
          urban: [],//stores urban data
          urban_area: "Information Currently Unavailable",//name of urban area
          mayor: "Information Currently Unavailable",//mayor of urban area
        };

        this.getData = this.getData.bind(this);
    }

    //retrieves data from Teleport API about city's urban area
    getData = () => {
        if (this.props.data._links["city:urban_area"] !== undefined){
            axios.get(this.props.data._links["city:urban_area"].href)
            .then((urbanRes) =>{
                const urbanArea = urbanRes.data.name
                var urbanMayor = "Information Currently Unavailable"
                if (urbanRes.data.mayor !== undefined){urbanMayor = urbanRes.data.mayor}//some urban areas do not have a listed mayor
                this.setState({ urban: urbanRes, urban_area: urbanArea, mayor: urbanMayor });
            })
            .catch((error) => {
                console.log(error);
            });
        }   
        
        else {
            this.setState({ urban: [], urban_area: "Information Currently Unavailable", mayor: "Information Currently Unavailable" });
        }
    }

    // retrieving urban data on mount
    componentDidMount = () => {
        this.getData()
    } 

    //updating urban data on re-render
    componentDidUpdate = (prevProps) => {
        if (this.props.data !== prevProps.data) {
            this.getData()
        }
    }
    
    render(){
    return(
    <div className="container">
        <div className="container row row-heading">
            <Flag data={this.props.data} className="col-sm-1 flag"></Flag>
            <p className="text-center data-header col-sm-10"> Basic Information of {this.props.data.full_name}</p>
            <Flag data={this.props.data} className="col-sm-1 flag"></Flag>
        </div>
        <p className="text-center text-note"> NOTE:</p>
        <p className="text-center"> The following information is provided by Teleport and may be outdated.</p>
        <div className="row">
            <div className="col-sm-3">
                <div className="card basic-card">
                    <div className="card-body">
                        <h5 className="card-title">Population</h5>
                        <p className="card-text">{(this.props.data.population).toLocaleString(undefined)}</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="card basic-card">
                    <div className="card-body">
                        <h5 className="card-title">Urban Area (UA)</h5>
                        <p className="card-text">{this.state.urban_area}</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="card basic-card">
                    <div className="card-body">
                        <h5 className="card-title">Mayor (of UA)</h5>
                        <p className="card-text">{this.state.mayor}</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="card basic-card">
                    <div className="card-body">
                        <h5 className="card-title">Geographical Location</h5>
                        <p className="card-text">Latitude: {this.props.data.location.latlon.latitude}</p>
                        <p>Longitude: {this.props.data.location.latlon.longitude}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-sm-6">
                <p className="text-center data-header">Interactive Map of {this.props.data.name}</p>
                <div className="container container-map">
                    <ReactBingmaps
                    className="bing-map"//map is provided by Bing Maps API
                    bingmapKey = {process.env.REACT_APP_API_KEY}//bing map api key
                    center = {[this.props.data.location.latlon.latitude, this.props.data.location.latlon.longitude]}//sets central location of map
                    zoom = {10}
                    ></ReactBingmaps>
                </div>
                <UrbanScores data={this.state.urban.data}></UrbanScores>
            </div>
            <div className="col-sm-6">
                <UrbanSalaries data={this.state.urban.data}></UrbanSalaries>
            </div>
        </div>
    </div>);
    }
}

export default CityData
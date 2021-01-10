import axios from 'axios'
import React, { Component } from "react";

class Flag extends Component{

    constructor(props) {
        super(props);
        this.state = {
          country_iso: ""//stores iso alpha code of country (of city)
        };

        this.getFlag = this.getFlag.bind(this);
    }

    //retrieves data from Teleport API about country
    getFlag = () => {
        axios.get(this.props.data._links["city:country"].href)
        .then((country) =>{
            this.setState({country_iso: country.data.iso_alpha2})
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //retreving country data on mount
    componentDidMount = () => {
        this.getFlag()
    } 

    //updating country data on re-render
    componentDidUpdate = (prevProps) => {
        if (this.props.data !== prevProps.data) {
            this.getFlag()
        }
    }
    
    //render flag component
    render() {
        return(
            <div className="text-center">{/*Flag provided by https://www.countryflags.io/*/}
                <img src={`https://www.countryflags.io/${this.state.country_iso}/shiny/64.png`} alt=""></img>
            </div>
        )
    }
}

export default Flag
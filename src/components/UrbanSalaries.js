import axios from 'axios'
import React, { Component } from "react";

class UrbanSalaries extends Component{

    constructor(props) {
        super(props);
        this.state = {
          urbanSalaries: []//stores data on urban area salaries
        };

        this.getSalaries = this.getSalaries.bind(this);
    }
    
    //retrieves data from Teleport API about urban area's salaries
    getSalaries = () => {
        if (this.props.data !== undefined){
            axios.get(this.props.data._links["ua:salaries"].href)
            .then((salary) =>{
                this.setState({urbanSalaries: salary.data.salaries})
            })
            .catch((error) => {
                console.log(error);
            });
        } 
        
        else {
            this.setState({ urbanSalaries: [], });
        }
    }

    //retrieving urban area salary data on mount
    componentDidMount = () => {
        this.getSalaries()
    } 

    //updating urban area salary data on re-render
    componentDidUpdate = (prevProps) => {
        if (this.props.data !== prevProps.data) {
            this.getSalaries()
        }
    }
    
    //renders salary table 
    render(){
        return(
            <div className="text-center">
                {this.props.data !== undefined ? (//data can only be rendered for urban areas that have data
                    <div className="text">
                        <p className="text-center data-header"> Median Salaries in the Urban Area: {this.props.data.full_name}</p>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className= "table-info">Occupation</th>
                                    <th className= "table-info">Median Salary (in USD)</th>
                                </tr>
                            </thead>
                            <tbody className="container">{this.state.urbanSalaries.map((result, i) => (
                                <tr key={`job ${i}`} >
                                    <td>{result.job.title}</td>
                                    {result.salary_percentiles.percentile_50 >= 70000 ? ( //green for salaries 70000 and above
                                    <td className="table-success">$ {(result.salary_percentiles.percentile_50).toLocaleString(undefined, {maximumFractionDigits:2})}</td> 
                                    ) : result.salary_percentiles.percentile_50 <= 30000 ? (//red for salaries 30000 and below
                                    <td className="table-danger">$ {(result.salary_percentiles.percentile_50).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                                    ) : <td className="table-warning">$ {(result.salary_percentiles.percentile_50).toLocaleString(undefined, {maximumFractionDigits:2})}</td>}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> 
                ) : <p className="text-center data-header">Unfortunately, quality of life scores and salary data are not availible yet!</p>}
            </div>
        )
    }
}

export default UrbanSalaries
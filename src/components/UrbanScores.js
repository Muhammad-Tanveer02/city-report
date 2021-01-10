import axios from 'axios'
import React, { Component } from "react";
import Chart from 'chart.js';

class UrbanScores extends Component{

    constructor(props) {
        super(props);
        this.state = {
          urbanScores: []//stores data on urban area scores
        };

        this.getScores = this.getScores.bind(this);
    }

    //retrieves data from Teleport API urban area's scores
    getScores = () => {
        if (this.props.data !== undefined){
            axios.get(this.props.data._links["ua:scores"].href)
            .then((scores) =>{
                this.setState({urbanScores: scores.data.categories})

                //the following code chart that displays the scores, made using Chart.js
                if (this.props.data !== undefined){
                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'horizontalBar',
                        data: {
                            labels: this.state.urbanScores.map(result => (result.name)),
                            datasets: [{
                                label: 'Score out of 10',
                                data: this.state.urbanScores.map(result => (result.score_out_of_10)),
                                backgroundColor: this.state.urbanScores.map(result => (result.color)),
                                borderWidth: 1
                            }]
                        },
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        } 
        
        else {
            this.setState({ urbanScores: []});
        }
    }

    //retreving urban area score data on mount
    componentDidMount = () => {
        this.getScores()
    } 

    //updating urban area score on re-render
    componentDidUpdate = (prevProps) => {
        if (this.props.data !== prevProps.data) {
            this.getScores()
        }
    }
    
    //renders score table and graph
    render() {
        return(
            <div className="text-center">
                {this.props.data !== undefined ? (//data can only be rendered for urban areas that have data
                    <div className="text">
                        <p className="text-center data-header"> Quality of Life for the Urban Area: {this.props.data.full_name}</p>
                        <canvas id="myChart" width="400" height="840"></canvas>
                        <table className="table table-striped">
                            <thead>
                                <tr className="table">
                                    <th className="table-primary">Category</th>
                                    <th className="table-primary">Score (out of 10)</th>
                                </tr>
                            </thead>
                            <tbody className="container">{this.state.urbanScores.map((result, i) => (
                                <tr key={`category ${i}`}> 
                                    <td>{result.name}</td>
                                    {result.score_out_of_10 >= 7 ? ( //green (good) for scores 7 and above
                                    <td className="table-success ">{(result.score_out_of_10).toFixed(2)}</td> 
                                    ) : result.score_out_of_10 <= 3 ? (//red (bad) for scores 3 and below
                                    <td className="table-danger ">{(result.score_out_of_10).toFixed(2)}</td>
                                    ) : <td className="table-warning ">{(result.score_out_of_10).toFixed(2)}</td>}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> 
                ) : null}
            </div>
        )
    }
}

export default UrbanScores
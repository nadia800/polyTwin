import React from 'react';
import Chart from 'react-apexcharts';
import { useDispatch } from "react-redux";

//API Innovatwin
import { deleteChart } from '../../actions/delete/delete';

//Icons
import { MdOutlineAutoDelete } from "react-icons/md";
import { IconContext } from "react-icons";

function Donut(props) {
    const data = props.chart.data
    const options = {
        series: [],
        labels: []
    }
    for (var i in data.data) {
        options.labels.push(data.data[i].attributeName);
        var S = 0;
        var N = 0;
        for (var j in data.data[i].values) {
            if (data.data[i].values[j].y) {
                S += Math.round(data.data[i].values[j].y * 100) / 100;
                N++;
            }
        }
        options.series.push(S/N)
    }

    const dispatch = useDispatch();
    const handleRemoveChart = async () => {
        await dispatch(deleteChart(props.chart.chartId))
            .then(data => {
                //Delete Insight where id = chartId
                console.log(data.message)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div style={{
            width: "350px",
            height: "360px",
            border: "2px hidden",
            marginLeft: "20px",
            backgroundColor: "#fff",
            borderRadius: "5px",
            display: "inline-block"
        }}>
            <div style={{
                marginLeft : "20px"
            }}>
                <div style={{
                    display: "flex"
                }}>
                    <div style={{
                        fontSize: "20px",
                        fontFamily: 'Rubik',
                        marginTop: "5px"
                    }}>{props.chart.chartName}</div>
                    <IconContext.Provider value={{ color: "#4ABED9", size: 25 }}>
                        <div>
                            <MdOutlineAutoDelete style={{
                                flex: "3",
                                marginLeft: "230px",
                                marginTop: "5px"
                            }} onClick={() => handleRemoveChart()} />
                        </div>
                    </IconContext.Provider>
                </div>
                <div style={{
                    fontSize: "15px",
                    fontFamily: 'Rubik',
                }}>{props.categorie}</div>
                <div style={{
                    fontSize: "15px",
                    fontFamily: 'Rubik',
                    color: "#855CF8"
                }}>Time Frame : {props.chart.timeFrame}</div>
            </div>
            <Chart
                options={options}
                series={options.series}
                type="donut"
                width="350"
                height="300"
                style={{
                    paddingTop : "50px"
                }} />
      </div>
    );
}

export default Donut;
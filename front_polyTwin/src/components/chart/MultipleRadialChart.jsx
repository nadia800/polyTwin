import ReactApexChart from 'react-apexcharts';
import React, {
    useState,
    useEffect
} from 'react';
import { useDispatch } from "react-redux";

//API Innovatwin
import { deleteChart } from '../../actions/delete/delete';

//Icons
import { MdOutlineAutoDelete } from "react-icons/md";
import { IconContext } from "react-icons";



function MultipleRadialChart(props) {
    const name = []
    const series = []
    
    for (var k in props.chart.data.data) {
        name.push(props.chart.data.data[k].attributeName)
        var j = 0;
        let Somme = 0;
        for (var i in props.chart.data.data[k].values) {
            if (props.chart.data.data[k].values[i].y) {
                Somme += props.chart.data.data[k].values[i].y;
            }
        }
        while (j < props.chart.data.data[k].values.length) {
            if (props.chart.data.data[k].values[j].y) {
                const value = props.chart.data.data[k].values[j].y * 100 / Somme;
                series.push(value.toFixed(2))
                break;
            }
            j++
        }
    }
    

    const [options, useOptions] = useState({
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                }
            },
        },
        labels: name
    })
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
        <div className="chart">
            <div style={{
                marginLeft: "20px"
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
                                marginLeft: "180px",
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
            <div id="chart" style={{
                marginTop: '20px'
            }}>
                <ReactApexChart options={options} series={series} type="radialBar" height={270} />
            </div>
        </div>
    );
}

export default MultipleRadialChart;
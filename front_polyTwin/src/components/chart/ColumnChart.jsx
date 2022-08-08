import React, {
    useState,
    useEffect
} from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch } from "react-redux";

//API Innovatwin
import { deleteChart } from '../../actions/delete/delete';

//Icons
import { MdOutlineAutoDelete } from "react-icons/md";
import { IconContext } from "react-icons";

function Column(props) {
    const data = props.chart.data
    var dataListX = [];
    const series = []
    for (var i in data.data) {
        var dataListY = [];
        for (var j in data.data[i].values) {
            if (data.data[i].values[j].y) {
                dataListY.push(Math.round(data.data[i].values[j].y * 100) / 100);
                const dateObject = props.chart.timeFrame ? (new Date(data.data[0].values[j].x).toDateString()).substring(0, 15) : (new Date(data.data[0].values[j].x).toTimeString()).substring(0, 5)
                dataListX.push(dateObject)
            }
        }
        series.push({ name: data.data[i].attributeName, data: dataListY })
    }
    
    const [options, useOptions]= useState({
        chart: {
            height: 350,
                type: 'bar',
              },
        plotOptions: {
            bar: {
                borderRadius: 10,
                    dataLabels: {
                    position: 'top', // top, center, bottom
                  },
            }
        },
        dataLabels: {
            enabled: true,
                formatter: function (val) {
                    return val ;
                },
            offsetY: -20,
                style: {
                fontSize: '12px',
                    colors: ["#304758"]
            }
        },

        xaxis: {
            categories: dataListX,
                position: 'top',
                    axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                        gradient: {
                        colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                                stops: [0, 100],
                                    opacityFrom: 0.4,
                                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
                }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
                },
            labels: {
                show: false,
                    formatter: function (val) {
                        return val;
                    }
            }

        },
        title: {
            text: data.data[0].attributeName,
                floating: true,
                    offsetY: 330,
                        align: 'center',
                            style: {
                color: '#444'
            }
        }
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
                        marginTop: "5px",
                        flex: "1"
                    }}>{props.chart.chartName}</div>
                    <IconContext.Provider value={{ color: "#4ABED9", size: 25 }}>
                        <div>
                            <MdOutlineAutoDelete style={{
                                flex: "3",
                                marginLeft: "200px",
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
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={270} />
            </div>
        </div>
    );
}

export default Column;
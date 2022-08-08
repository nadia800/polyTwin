import React, {
    useState,
    useEffect
} from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch } from "react-redux";
import Alert from 'react-bootstrap/Alert';

//API Innovatwin
import { deleteChart } from '../../actions/delete/delete';

//Icons
import { MdOutlineAutoDelete } from "react-icons/md";
import { IconContext } from "react-icons";

function GroupedBarChart(props) {
    const [message, setMessage] = useState("")
    const data = props.chart.data
    const series = []
    var dataListX = [];
    for (var i in data.data) {
        var dataListY = [];
        for (var j in data.data[i].values) {
            if (data.data[i].values[j].y) {
                dataListY.push(Math.round(data.data[i].values[j].y * 100) / 100);
                const dateObject = props.chart.timeFrame ? (new Date(data.data[0].values[j].x).toDateString()).substring(0, 15) : (new Date(data.data[0].values[j].x).toTimeString()).substring(0, 5)
                dataListX.push(dateObject)
            }
        }
        series.push({ name: data.data[i].attributeName, data : dataListY })
    }
    const [options, useOptions] = useState({
        chart: {
            type: 'bar',
            height: 430
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        xaxis: {
            categories: dataListX,
        }
    })
    const dispatch = useDispatch();
    const handleRemoveChart = async () => {
        await dispatch(deleteChart(props.chart.chartId))
            .then(data => {
                //Delete Insight where id = chartId
                setMessage(data.message)
            })
            .catch(err => {
                console.log(err)
            })
    }
    console.log(message.length)
    return (
        <div>
            {message.length === 0 ?
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
                                        flex: "2",
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
                </div> :
                <Alert>
                    {message}
                </Alert>
                }
        </div>
       
    );
}

export default GroupedBarChart;
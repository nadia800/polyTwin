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
import { width } from '@mui/system';

function SplineAreaDashboard(props) {
    const data = props.chart.data
    const series = []
    var dataListX = [];
    const [height, setHeight] = useState(props.height);
    const [width, setWidth] = useState(props.width);
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


    const [options, useOptions] = useState({
        chart: {
            height: 400,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: data.data[0].attributeName,
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            type: 'datetime',
            categories: dataListX
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
        <div>
            <div id="chart" onMouseEnter={() => {
                setHeight('300')
                setWidth('300')
            }}
                onMouseLeave={() => {
                    setHeight('100')
                    setWidth('100')
                }}>
                <ReactApexChart options={options} series={series} type="area" height={height} width={width} />
            </div>
        </div>
    );
}

export default SplineAreaDashboard;
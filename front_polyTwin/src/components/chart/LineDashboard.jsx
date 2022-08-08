import ReactApexChart from 'react-apexcharts';
import React, {
    useState,
    useEffect
} from 'react';


function LineChart(props) {
    console.log(props.chart)
    const data = props.chart.data
    var dataListY = [];
    var dataListX = [];
    const [height, setHeight] = useState(props.height);
    const [width, setWidth] = useState(props.width);
    for (var i in data.data[0].values) {
        if (data.data[0].values[i].y) {
            dataListY.push(Math.round(data.data[0].values[i].y * 100) / 100)
            const dateObject = (new Date(data.data[0].values[i].x).toTimeString()).substring(0, 5)
            dataListX.push(dateObject)
        }
    }

    const [series, setSeries] = useState([{
        name: data.data[0].attributeName,
        data: dataListY
    }])


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
            curve: 'straight'
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
            categories: dataListX
        }
    })
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
                <ReactApexChart options={options} series={series} type="line" height={height} width={width} />
            </div>
        </div>
    );
}

export default LineChart;
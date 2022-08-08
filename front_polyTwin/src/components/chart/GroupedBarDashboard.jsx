import React, {
    useState,
    useEffect
} from 'react';
import ReactApexChart from 'react-apexcharts';

function GroupedBarDashboard(props) {
    const data = props.chart.data
    const [height, setHeight] = useState(props.height);
    const [width, setWidth] = useState(props.width);
    const series = []
    var dataListX = [];
    for (var i in data.data[0].values) {
        const dateObject = (new Date(data.data[0].values[i].x).toTimeString()).substring(0, 5)
        dataListX.push(dateObject)
    }
    console.log(dataListX)
    for (var i in data.data) {
        var dataListY = [];
        for (var j in data.data[i].values) {
            if (data.data[i].values[j].y) {
                dataListY.push(Math.round(data.data[i].values[j].y * 100) / 100);
            }
        }
        series.push({ name: data.data[i].attributeName, data: dataListY })
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
                <ReactApexChart options={options} series={series} type="bar" height={height} width={width} />
            </div>
        </div>
    );
}

export default GroupedBarDashboard;
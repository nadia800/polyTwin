import React from 'react';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function DonutDashboard(props) {
    const data = props.chart.data
    console.log(props.height)
    const [height, setHeight] = useState(props.height);
    const [width, setWidth] = useState(props.width);
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
                N= data.data[0].values[j].y
            }
        }
        console.log(N)
        console.log(S)
        options.series.push(N/S)
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
                <ReactApexChart
                    options={options}
                    series={options.series}
                    labels={false}
                    type="donut"
                    width={width}
                    height={height}
                    />
            </div>
        </div>
    );
}

export default DonutDashboard;
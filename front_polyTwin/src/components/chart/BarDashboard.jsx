import ReactApexChart from 'react-apexcharts';
import React, {
    useState,
    useEffect
} from 'react';
import '../../scss/BarDashboard.scss'


function BarDashboard(props) {
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
        data: dataListY
    }])
    const [options, useOptions] = useState({
        chart: {
            type: 'bar',
            height: 200
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
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
                <ReactApexChart className="barDashboard" options={options} series={series} type="bar" height={height} width={width} />
            </div>
        </div>
    );
}

export default BarDashboard;
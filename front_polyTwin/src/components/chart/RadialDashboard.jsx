import ReactApexChart from 'react-apexcharts';
import React, {
    useState,
    useEffect
} from 'react';


function RadialChart(props) {
    const [height, setHeight] = useState(props.height);
    const [width, setWidth] = useState(props.width);
    const value = (props.chart.data.data[0].values[0].x) / 100000000;
    const name = props.chart.data.data[0].attributeName
    const [series, setSeries] = useState([value])
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
        labels: [name]
    })
    return (
        <div> 
            <div id="chart" onMouseEnter={() => {
                setHeight('300')
                setWidth('300')
            }}
                onMouseLeave={() => {
                    setHeight('150')
                    setWidth('150')
                }}>
                <ReactApexChart options={options} series={series} type="radialBar" height={height} width={width} />
            </div>
        </div>
    );
}

export default RadialChart;
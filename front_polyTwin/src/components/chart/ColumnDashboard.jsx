import React, {
    useState,
    useEffect
} from 'react';
import ReactApexChart from 'react-apexcharts';

function ColumnDashboard(props) {
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
        name: 'Value',
        data: dataListY
    }])
    const [options, useOptions] = useState({
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
                return val;
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

export default ColumnDashboard;
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



function MultipleRadialDashboard(props) {
    const name = []
    const series = []
    const [height, setHeight] = useState(props.height);
    const [width, setWidth] = useState(props.width);
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
        <div>
            <div id="chart" onMouseEnter={() => {
                setHeight('300')
                setWidth('300')
            }}
                onMouseLeave={() => {
                    setHeight('100')
                    setWidth('100')
                }}>
                <ReactApexChart options={options} series={series} type="radialBar" height={height} width={width} />
            </div>
        </div>
    );
}

export default MultipleRadialDashboard;
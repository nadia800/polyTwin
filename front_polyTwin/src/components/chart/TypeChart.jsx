import React, { useState } from 'react';
import LineChart from '../chart/LineChart';
import DountChart from '../chart/DountChart';
import BarChart from '../chart/BarChart';
import ColumnChart from '../chart/ColumnChart';
import RadialChart from '../chart/RadialChart';
import GroupedBarChart from '../chart/GroupedBarChart';
import GroupedLineChart from '../chart/GroupedLineChart';
import SplineAreaChart from '../chart/SplineAreaChart';
import MultipleRadialChart from '../chart/MultipleRadialChart';

function TypeChart({ chart, categorie}) {
    return (
        <div>
            {
                chart.chartType === "Dount Chart" ?
                    <DountChart chart={chart} key={chart.chartId} categorie={categorie}  /> :
                    chart.chartType === "Line Chart" ?
                        <LineChart chart={chart} key={chart.chartId} categorie={categorie}  /> :
                        chart.chartType === "Bar Chart" ?
                            <BarChart chart={chart} key={chart.chartId} categorie={categorie}/> :
                            chart.chartType === "Column Chart" ?
                                <ColumnChart chart={chart} key={chart.chartId} categorie={categorie}  /> :
                                chart.chartType === "Radial Chart" ?
                                    <RadialChart chart={chart} key={chart.chartId} categorie={categorie} /> :
                                    chart.chartType === "Grouped Bar Chart" ?
                                        <GroupedBarChart chart={chart} key={chart.chartId} categorie={categorie} /> :
                                            chart.chartType === "Grouped Line Chart" ?
                                                <GroupedLineChart chart={chart} key={chart.chartId} categorie={categorie} /> :
                                            chart.chartType === "Spline Area Chart" ?
                                                <SplineAreaChart chart={chart} key={chart.chartId} categorie={categorie} /> :
                                                chart.chartType === "Multiple Radial Chart" ?
                                                    <MultipleRadialChart chart={chart} key={chart.chartId} categorie={categorie} /> :
                                        null

            }
        </div>
    )
}

export default TypeChart;
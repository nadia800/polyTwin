import React, { useState } from 'react';
import LineDashboard from '../chart/LineDashboard';
import DountDashboard from '../chart/DountDashboard';
import BarDashboard from '../chart/BarDashboard'
import ColumnDashboard from '../chart/ColumnDashboard';
import RadialDashboard from '../chart/RadialDashboard';
import GroupedBarDashboard from '../chart/GroupedBarDashboard';
import GroupedLineDashboard from '../chart/GroupedLineDashboard';
import SplineAreaDashboard from '../chart/SplineAreaDashboard';
import MultipleRadialDashboard from '../chart/MultipleRadialDashboard';

function TypeChartDashboard({ chart, height, width }) {
    return (
        <div>
            {
                chart.chartType === "Dount Chart" ?
                    <DountDashboard chart={chart} key={chart.chartId} height={height} width={width}  /> :
                    chart.chartType === "Line Chart" ?
                        <LineDashboard chart={chart} key={chart.chartId} height={height} width={width} /> :
                        chart.chartType === "Bar Chart" ?
                            <BarDashboard chart={chart} key={chart.chartId} height={height} width={width} /> :
                            chart.chartType === "Column Chart" ?
                                <ColumnDashboard chart={chart} key={chart.chartId} height={height} width={width} /> :
                                chart.chartType === "Radial Chart" ?
                                    <RadialDashboard chart={chart} key={chart.chartId} height={height} width={width} /> :
                                    chart.chartType === "Grouped Bar Chart" ?
                                        <GroupedBarDashboard chart={chart} key={chart.chartId} height={height} width={width} /> :
                                        chart.chartType === "Grouped Line Chart" ?
                                            <GroupedLineDashboard chart={chart} key={chart.chartId} height={height} width={width}/> :
                                            chart.chartType === "Spline Area Chart" ?
                                                <SplineAreaDashboard chart={chart} key={chart.chartId} height={height} width={width}/> :
                                                chart.chartType === "Multiple Radial Chart" ?
                                                    <MultipleRadialDashboard chart={chart} key={chart.chartId} height={height} width={width}/> :
                                        null

            }
        </div>
    )
}

export default TypeChartDashboard;
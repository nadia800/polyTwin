import React, { useState } from 'react';
import TypeChartDashboard from '../chart/TypeChartDashboard'
import '../../scss/ChartBoard.scss';
function ChartBoardDashboard(props) {
    return (
        <div>
            <div>
                <TypeChartDashboard chart={props.chart} height={props.height} width={props.width} />
            </div>

        </div>
    )
}

export default ChartBoardDashboard;
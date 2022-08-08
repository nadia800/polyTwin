import React, { useState } from 'react';
import TypeChart from '../chart/TypeChart'
import '../../scss/ChartBoard.scss';
function ChartBoard(props) {
    return (
        <div>
            <div>
                <TypeChart chart={props.chart} categorie={props.categorie}/>
            </div>
            
        </div>
    )
}

export default ChartBoard;
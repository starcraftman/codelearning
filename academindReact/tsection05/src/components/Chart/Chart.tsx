import React from "react";
import ChartBar from "./ChartBar";

import "./Chart.css"


export interface ChartValue {
    label: string;
    value: number;
}
interface PropsType {
    dataPoints: ChartValue[];
}

const Chart = (props: PropsType) => {
    const maxValue = Math.max(...props.dataPoints.map(point => point.value));
    return (
        <div className="chart">
            {props.dataPoints.map(point => {
                return <ChartBar
                    value={point.value}
                    maxValue={maxValue}
                    label={point.label}
                    key={point.label}
                />
            })}
        </div>
    );
};

export default Chart;

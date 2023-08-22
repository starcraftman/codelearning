
import React from "react";

export interface TableDataType {
    year: number;
    totalSavings: number;
    yearlyInterest: number;
    totalInterest: number;
}

interface PropsType {
    data: TableDataType;
    key: number;
}

const TableRow = (props: PropsType) => {
    return (
        <tr>
            <td>{props.data.year}</td>
            <td>{"$" + props.data.totalSavings.toFixed(2)}</td>
            <td>{"$" + props.data.yearlyInterest.toFixed(2)}</td>
            <td>{"$" + props.data.totalInterest.toFixed(2)}</td>
            <td>{"$" + (props.data.totalSavings - props.data.totalInterest).toFixed(2)}</td>
        </tr>
    );
};

export default TableRow;


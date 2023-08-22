
import React from "react";

import TableRow, { TableDataType } from "./TableRow";

interface PropsType {
    data: TableDataType[];
}

const CalcTable = (props: PropsType) => {
    const tableRows = props.data.map(point => {
        return <TableRow key={point.year} data={point} />
    })

    return (
        <table className="result">
        <thead>
        <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
        </tr>
        </thead>
        <tbody>
            {tableRows}
        </tbody>
        </table> 
    );
};

export default CalcTable;


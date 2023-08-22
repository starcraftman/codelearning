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
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const TableRow = (props: PropsType) => {
    return (
        <tr>
            <td>{props.data.year}</td>
            <td>{formatter.format(props.data.totalSavings)}</td>
            <td>{formatter.format(props.data.yearlyInterest)}</td>
            <td>{formatter.format(props.data.totalInterest)}</td>
            <td>{formatter.format(props.data.totalSavings - props.data.totalInterest)}</td>
        </tr>
    );
};

export default TableRow;


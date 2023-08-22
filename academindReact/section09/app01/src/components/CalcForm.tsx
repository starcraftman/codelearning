import React from "react";

import Button from "./UI/Button";
import InputNumber from "./UI/InputNumber";
import CalcInputData from "./CalcFormInput";


interface PropsType {
    submitHandler: (data: CalcInputData) => void;
    resetTable: () => void;
}

const CalcForm = (props: PropsType) => {
    const [currentSavings, setCurrentSavings] = React.useState(0);
    const [yearlyContribution, setYearlyContribution] = React.useState(0);
    const [expectedReturn, setExpectedReturn] = React.useState(0);
    const [duration, setDuration] = React.useState(0);


    const currentSavingsChange = (event: React.ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value;
        setCurrentSavings(parseFloat(value));
    }
    const yearlyContributionChange = (event: React.ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value;
        setYearlyContribution(parseFloat(value));
    }    
    const expectedReturnChange = (event: React.ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value;
        setExpectedReturn(parseFloat(value));
    }
    const durationChange = (event: React.ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value;
        setDuration(parseInt(value));
    }
    const submitForm = (event: React.FormEvent) => {
        event.preventDefault();
        const inputData: CalcInputData = {
            "current-savings": currentSavings,
            "yearly-contribution": yearlyContribution,
            "expected-return": expectedReturn,
            "duration": duration,
        }
        props.submitHandler(inputData);
    }

    const resetForm = (event: React.MouseEvent) => {
        props.resetTable();
        setCurrentSavings(0);
        setYearlyContribution(0);
        setExpectedReturn(0);
        setDuration(0);
    }

    return (
    <form onSubmit={submitForm} className="form">
        <div className="input-group">
            <InputNumber fieldValue={currentSavings} onChangeHandler={currentSavingsChange} htmlFor="current-savings">Current Savings ($)</InputNumber>
            <InputNumber fieldValue={yearlyContribution} onChangeHandler={yearlyContributionChange} htmlFor="yearly-contribution">Yearly Savings ($)</InputNumber>
        </div>
        <div className="input-group">
            <InputNumber fieldValue={expectedReturn} onChangeHandler={expectedReturnChange} htmlFor="expected-return">Expected Interest (%, per year)</InputNumber>
            <InputNumber fieldValue={duration} onChangeHandler={durationChange} htmlFor="duration">Investment Duration (years)</InputNumber>
        </div>
        <p className="actions">
            <Button onClick={resetForm} className="buttonAlt">Reset</Button>
            <Button className="button">Calculate</Button>
        </p>
    </form>
)};

export default CalcForm;
import React from 'react';

import { TableDataType } from './components/TableRow';
import CalcInputData from './components/CalcFormInput';
import CalcForm from './components/CalcForm';
import CalcTable from './components/CalcTable';
import logo from './assets/investment-calculator-logo.png';

function App() {
  const calculateHandler = (userInput: CalcInputData) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...
    const yearlyData: TableDataType[] = []; // per-year results

    let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    // The below code calculates yearly results (total savings, interest etc)
    let totalInterest = 0.0;
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      totalInterest += yearlyInterest;
      currentSavings += yearlyInterest + yearlyContribution;

      const rowData: TableDataType = {
        year: i + 1,
        totalSavings: currentSavings,
        yearlyInterest: yearlyInterest,
        totalInterest: totalInterest,
      }
      yearlyData.push(rowData);
    }
    
    setTableData(yearlyData)
  };

  const submitHandler = (data: CalcInputData) => {
    calculateHandler(data);
  }
  const [tableData, setTableData] = React.useState([] as TableDataType[]);
  let investmentTable = <h3 className="header">No investment calculated yet.</h3>;
  if (tableData.length !== 0) {
    investmentTable = <CalcTable data={tableData} />
  }
  return (
    <div>
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>

      <CalcForm resetTable={() => setTableData([])} submitHandler={submitHandler}/>

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      {investmentTable}
    </div>
  );
}

export default App;

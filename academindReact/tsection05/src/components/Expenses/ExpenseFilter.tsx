import React from 'react';

import './ExpenseFilter.css';

interface PropsType {
  onFilterChange: (value: string) => void;
  selected: string;
};

const ExpensesFilter = (props: PropsType) => {
  const onChangeHandler = (event: React.ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    props.onFilterChange(value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>
        <select value={props.selected} onChange={onChangeHandler}>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;

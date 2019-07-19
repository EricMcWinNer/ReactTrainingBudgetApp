import React from "react";

export const IncomeStream = props => {
  const incomeStream = {
    id: props.id,
    name: props.name,
    amount: props.amount,
    frequency: props.frequency
  };
  return (
    <tr>
      <td>{props.name}</td>
      <td>${props.amount.toFixed(2)}</td>
      <td>{props.frequency}</td>
      <td>
        <button onClick={e => props.enableEditIncomeStream(incomeStream)}>
          Edit
        </button>
        <button onClick={e => props.deleteIncomeStream(e, props.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
export const Expenses = props => {
  const expense = { name: props.name, amount: props.amount, id: props.id };
  return (
    <tr>
      <td>{props.name}</td>
      <td>${props.amount.toFixed(2)}</td>
      <td>
        <button onClick={e => props.enableEditExpense(expense)}>Edit</button>
        <button onClick={e => props.deleteExpense(e, props.id)}>Delete</button>
      </td>
    </tr>
  );
};

export const UpdateExpense = props => {
  return (
    <div>
      <h3>Edit {props.edit_expense_name}</h3>
      <input
        type="text"
        value={props.edit_expense_name}
        name="edit_expense_name"
        placeholder={"New Name"}
        onChange={e => props.onChange(e)}
      />
      <input
        type="text"
        value={props.edit_expense_amount}
        name="edit_expense_amount"
        onChange={e => props.onChange(e)}
      />
      <button onClick={e => props.editExpense(e, props.edit_expense)}>
        Edit Income Stream
      </button>
    </div>
  );
};

export const UpdateIncomeStream = props => {
  return (
    <div>
      <h3>Edit {props.edit_income_name}</h3>
      <input
        type="text"
        value={props.edit_income_name}
        name="edit_income_name"
        onChange={e => props.onChange(e)}
      />
      <input
        type="text"
        value={props.edit_income_amount}
        name="edit_income_amount"
        onChange={e => props.onChange(e)}
      />
      <input
        type="text"
        value={props.edit_income_frequency}
        name="edit_income_frequency"
        onChange={e => props.onChange(e)}
      />
      <button
        onClick={e => props.editIncomeStream(e, props.edit_income_stream)}
      >
        Edit Income Stream
      </button>
    </div>
  );
};

export const CalculatedValues = props => {
  return (
    <div>
      <h1>Totals</h1>
      <table>
        <thead>
          <tr>
            <td>Field</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Income</td>
            <td>{props.total_income}</td>
          </tr>
          <tr>
            <td>Total Expenses</td>
            <td>{props.total_expenses}</td>
          </tr>
          <tr>
            <td>Money Left</td>
            <td>{props.balance_left}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

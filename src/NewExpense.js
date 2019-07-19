import React from "react";

const NewExpense = props => {
	return (
		<div>
			<h3>Create new Expense:</h3>
			<label htmlFor="new_expense_name">Name:</label>
			<input
				type="text"
				id="new_expense_name"
				value={props.new_expense_name}
				name="new_expense_name"
				onChange={e => props.onChange(e)}
			/>
			<label htmlFor="new_expense_amount">Amount:</label>
			<input
				type="text"
				id="new_expense_amount"
				value={props.new_expense_amount}
				name="new_expense_amount"
				onChange={e => props.onChange(e)}
			/>
			<button onClick={props.submitNewExpense}>Submit</button>
		</div>
	);
};

export default NewExpense;

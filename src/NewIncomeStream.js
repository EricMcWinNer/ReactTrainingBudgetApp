import React from "react";

const NewIncomeStream = props => {
	return (
		<div>
			<h3>Create new Income Stream:</h3>
			<label htmlFor="new_income_name">Name:</label>
			<input
				type="text"
				id="new_income_name"
				value={props.new_income_name}
				name="new_income_name"
				onChange={e => props.onChange(e)}
			/>
			<label htmlFor="new_income_amount">Amount:</label>
			<input
				type="text"
				id="new_income_amount"
				value={props.new_income_amount}
				name="new_income_amount"
				onChange={e => props.onChange(e)}
			/>
			<label htmlFor="new_income_frequency">Frequency:</label>
			<input
				type="text"
				id="new_income_frequency"
				value={props.new_income_frequency}
				name="new_income_frequency"
				onChange={e => props.onChange(e)}
			/>
			<button onClick={props.submitNewIncomeStream}>Submit</button>
		</div>
	);
};

export default NewIncomeStream;

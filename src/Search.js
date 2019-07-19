import React from "react";

const Search = props => {
  const budgets = props.budgets.map(budget => (
    <option value={budget.key} key={budget.key}>
      {budget.name}
    </option>
  ));
  return (
    <div>
      <label htmlFor="budget_page">Select the current Budget :</label>
      <select
        name="select_budget"
        value={props.value}
        onChange={e => props.selectChange(e)}
      >
        <option>Select a budget</option>
        {budgets}
      </select>
      <h2>Create new Budget</h2>
      <input
        type="text"
        value={props.new_budget_name}
        onChange={e => props.onChange(e)}
        name="new_budget_name"
        placeholder={"New Budget Name"}
      />
      <button onClick={() => props.createNewBudget()}>Create Budget</button>
      <h2>Delete Selected Budget</h2>
      <select
        name="delete_budget_id"
        value={props.delete_budget_id}
        onChange={e => props.selectChange(e)}
      >
        <option value={""}>Select a budget</option>
        {budgets}
      </select>
      <button onClick={() => props.deleteBudget(props.delete_budget_id)}>
        Delete Budget
      </button>
    </div>
  );
};

export default Search;

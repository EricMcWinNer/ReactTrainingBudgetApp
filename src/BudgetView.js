import React from "react";
import { Helmet } from "react-helmet";
import Search from "./Search";
import "./Budget.css";
import NewExpense from "./NewExpense";
import NewIncomeStream from "./NewIncomeStream";
import {
  IncomeStream,
  Expenses as Expense,
  UpdateExpense,
  UpdateIncomeStream,
  CalculatedValues
} from "./BudgetFields";

const BudgetView = props => {
  const incomeStreams = props.incomeStreams.map((incomeStream, i) => (
    <IncomeStream
      key={i}
      id={incomeStream.key}
      deleteIncomeStream={props.deleteIncomeStream}
      enableEditIncomeStream={props.enableEditIncomeStream}
      {...incomeStream}
    />
  ));
  const expenses = props.expenses.map((expense, i) => (
    <Expense
      key={i}
      id={expense.key}
      deleteExpense={props.deleteExpense}
      enableEditExpense={props.enableEditExpense}
      {...expense}
    />
  ));
  return props.isLoading ? (
    <h1>Loading...</h1>
  ) : props.hasError ? (
    <div>
      <h1 style={{ color: "red" }}>Loading Error</h1>
      <p>{props.error}</p>
    </div>
  ) : (
    <div className="budget">
      <Helmet>
        <title>{props.budget_name} - My Money Manager</title>
      </Helmet>
      <Search
        onChange={props.handleChange}
        loadBudget={props.getBudget}
        value={props.budget_id}
        budgets={props.budgets}
        selectChange={props.handleBudgetsSelect}
        new_budget_name={props.new_budget_name}
        createNewBudget={props.createNewBudget}
        deleteBudget={props.deleteBudget}
        delete_budget_id={props.delete_budget_id}
      />
      <h1>{props.budget_name}</h1>
      <h2>Current page {props.budget_page}</h2>
      <div>
        <h2>Income Streams</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Frequency</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{incomeStreams}</tbody>
        </table>
        {props.edit_income_stream === null ? (
          <div />
        ) : (
          <UpdateIncomeStream
            onChange={props.handleChange}
            edit_income_name={props.edit_income_name}
            edit_income_amount={props.edit_income_amount}
            edit_income_frequency={props.edit_income_frequency}
            edit_income_stream={props.edit_income_stream}
            editIncomeStream={props.editIncomeStream}
          />
        )}
        <NewIncomeStream
          onChange={props.handleChange}
          submitNewIncomeStream={props.submitNewIncomeStream}
          new_income_name={props.new_income_name}
          new_income_amount={props.new_income_amount}
          new_income_frequency={props.new_income_frequency}
        />
      </div>
      <div>
        <h2>Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{expenses}</tbody>
        </table>
        {props.edit_expense === null ? (
          <div />
        ) : (
          <UpdateExpense
            onChange={props.handleChange}
            edit_expense_name={props.edit_expense_name}
            edit_expense_amount={props.edit_expense_amount}
            edit_expense={props.edit_expense}
            editExpense={props.editExpense}
          />
        )}
        <NewExpense
          submitNewExpense={props.submitNewExpense}
          onChange={props.handleChange}
          new_expense_name={props.new_expense_name}
          new_expense_amount={props.new_expense_amount}
        />
      </div>
      <CalculatedValues
        total_income={props.total_income.toFixed(2)}
        total_expenses={props.total_expenses.toFixed(2)}
        balance_left={props.balance_left.toFixed(2)}
      />
    </div>
  );
};

export default BudgetView;

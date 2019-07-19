import React, { Component } from "react";
import axios from "axios";
import BudgetView from "./BudgetView";

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget_name: "",
      incomeStreams: [],
      expenses: [],
      isLoading: true,
      hasError: false,
      error: "",
      budget_id: "",
      delete_budget_id: "",
      new_expense_name: "",
      new_expense_amount: "",
      edit_expense: null,
      edit_income_stream: null,
      new_income_name: "",
      new_income_amount: "",
      new_income_frequency: "",
      edit_expense_name: "",
      edit_expense_amount: "",
      edit_income_name: "",
      edit_income_frequency: "",
      edit_income_amount: "",
      new_budget_name: "",
      total_income: 0,
      total_expenses: 0,
      balance_left: 0,
      budgets: []
    };
  }

  handleChange = event => {
    let { name, value, type } = event.target;
    if (name === "budget_page") {
      this.setState({
        budget_id: value
      });
    } else if (type === "text") {
      this.setState({
        [name]: value
      });
    }
  };

  deleteIncomeStream = (event, id) => {
    axios
      .delete(`https://127.0.0.1:3001/incomestream/${id}`)
      .then(
        r => this.getBudget(),
        error => {
          console.log(error);
        }
      )
      .finally();
  };

  deleteExpense = (event, id) => {
    axios
      .delete(`https://127.0.0.1:3001/expense/${id}`)
      .then(r => this.getBudget(), error => console.log(error));
  };

  editExpense = (event, id) => {
    axios
      .put(`https://127.0.0.1:3001/expense/${id}`, {
        name: this.state.edit_expense_name,
        amount: this.state.edit_expense_amount
      })
      .then(
        r => {
          this.setState(
            {
              edit_expense_name: "",
              edit_expense_amount: "",
              edit_expense: null
            },
            this.getBudget
          );
        },
        error => {
          console.log(error);
        }
      );
  };

  editIncomeStream = (event, id) => {
    axios
      .put(`https://127.0.0.1:3001/incomestream/${id}`, {
        name: this.state.edit_income_name,
        amount: this.state.edit_income_amount,
        frequency: this.state.edit_income_frequency
      })
      .then(
        r => {
          this.setState(
            {
              edit_income_name: "",
              edit_income_amount: "",
              edit_income_frequency: "",
              edit_income_stream: null
            },
            this.getBudget
          );
        },
        err => {
          console.log(err);
        }
      );
  };

  submitNewExpense = () => {
    axios
      .post(`https://127.0.0.1:3001/expense/${this.state.budget_id}`, {
        name: this.state.new_expense_name,
        amount: this.state.new_expense_amount
      })
      .then(
        response => {
          this.setState(
            {
              new_expense_name: "",
              new_expense_amount: ""
            },
            this.getBudget
          );
        },
        error => {
          console.log(error);
        }
      )
      .finally();
  };

  enableEditIncomeStream = incomeStream => {
    this.setState({
      edit_income_stream: incomeStream.id,
      edit_income_name: incomeStream.name,
      edit_income_frequency: incomeStream.frequency,
      edit_income_amount: incomeStream.amount
    });
  };

  enableEditExpense = expense => {
    this.setState({
      edit_expense: expense.id,
      edit_expense_name: expense.name,
      edit_expense_amount: expense.amount
    });
  };

  handleBudgetsSelect = event => {
    const { name, value } = event.target;
    if (name === "select_budget") {
      this.setState(
        {
          budget_id: value
        },
        this.getBudget
      );
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  createNewBudget = budget_name => {
    axios
      .post(`https://127.0.0.1:3001/budget`, {
        name: this.state.new_budget_name
      })
      .then(
        r => {
          /*this.setState(state => {
            let new_budgets = state.budgets;
            new_budgets.push({
              key: r.data.budget.id,
              name: state.new_budget_name
            });
            return {
              new_budget_name: "",
              budgets: new_budgets,
              budget_id: r.data.budget.id
            };
          });*/
          this.setState(
            {
              budget_id: r.data.budget.id,
              new_budget_name: ""
            },
            this.getBudget
          );
        },
        e => {
          console.log(e);
        }
      );
  };

  deleteBudget = id => {
    axios.delete(`https://127.0.0.1:3001/budget/${id}`).then(r => {
      if (id === r.data.message) {
        this.setState({ budget_id: this.state.budgets[1].key }, this.getBudget);
      } else this.getBudget();
    });
  };

  submitNewIncomeStream = () => {
    axios
      .post(`https://127.0.0.1:3001/incomestream/${this.state.budget_id}`, {
        name: this.state.new_income_name,
        amount: this.state.new_income_amount,
        frequency: this.state.new_income_frequency
      })
      .then(
        response => {
          this.setState(
            {
              new_income_name: "",
              new_income_amount: "",
              new_income_frequency: ""
            },
            this.getBudget
          );
        },
        error => {
          console.log(error);
        }
      )
      .finally();
  };

  getBudget = () => {
    axios
      .get(`https://127.0.0.1:3001/budget/${this.state.budget_id}`)
      .then(r => {
        console.log(r);
        this.setState({
          budget_name: r.data.name,
          incomeStreams: [...r.data.incomeStreams],
          expenses: [...r.data.expenses],
          isLoading: false,
          budgets: [...r.data.budgets],
          total_income: r.data.totalIncome,
          total_expenses: r.data.totalExpenses,
          balance_left: r.data.balance,
          budget_id: r.data.budgetId
        });
        console.log(
          "Requested by XHR",
          `https://127.0.0.1:3001/budget/${this.state.budget_page}`
        );
      })
      .catch(error => {
        // handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          this.setState({
            isLoading: false,
            hasError: true,
            error: error.response.data.message
          });
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          console.log(error.response.headers);
          this.setState({
            isLoading: false,
            hasError: true,
            error: error.response.headers
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          console.log(error.response.headers);
          this.setState({
            isLoading: false,
            hasError: true,
            error: error.response.error.message
          });
        }
        console.log(error.config);
      })
      .finally(function() {});
  };

  componentDidMount() {
    if (
      this.props.match.params.id !== undefined &&
      !isNaN(this.props.match.params.id)
    )
      this.setState({
        budget_id: this.props.match.params.id
      });
    this.getBudget();
  }

  render() {
    return (
      <BudgetView
        {...this.state}
        handleChange={this.handleChange}
        submitNewExpense={this.submitNewExpense}
        handleBudgetsSelect={this.handleBudgetsSelect}
        submitNewIncomeStream={this.submitNewIncomeStream}
        getBudget={this.getBudget}
        deleteIncomeStream={this.deleteIncomeStream}
        deleteExpense={this.deleteExpense}
        deleteBudget={this.deleteBudget}
        editExpense={this.editExpense}
        editIncomeStream={this.editIncomeStream}
        enableEditIncomeStream={this.enableEditIncomeStream}
        enableEditExpense={this.enableEditExpense}
        createNewBudget={this.createNewBudget}
      />
    );
  }
}

export default Budget;

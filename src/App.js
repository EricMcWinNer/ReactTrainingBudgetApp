import React from "react";
//import logo from "./logo.svg";
import Budget from "./Budget.js";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/budget/1"}>Budget</Link>
          </li>
        </ul>
      </div>
      <Switch>
        {/*<Redirect from={"/budget"} exact to={"/budget/"} />
        <Route path={"/budget/"} exact component={Budget} />*/}
        <Route path="/budget/:id" render={props => <Budget {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;

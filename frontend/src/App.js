import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import PageTemplate from "./pages/PageTemplate";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/events" component={PageTemplate} />
        <Route exact path="/my-account" component={AccountPage} />
        <Route exact path="/dashboard" component={AdminPage} />
      </Switch>
    </Router>
  );
}

export default App;

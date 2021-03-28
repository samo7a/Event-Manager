import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import EventPage from "./pages/EventPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/AdminPage";
import PageTemplate from "./pages/PageTemplate";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/home">
          <PageTemplate page="events" />
        </Route>
        <Route exact path="/events" component={EventPage} />
        <Route exact path="/my-account" component={AccountPage} />
        <Route exact path="/dashboard" component={AdminPage} />
      </Switch>
    </Router>
  );
}

export default App;

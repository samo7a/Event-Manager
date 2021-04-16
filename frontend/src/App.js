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
import UniProfilePage from "./pages/UniProfilePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/home">
          <PageTemplate page="events" />
        </Route>
        <Route exact path="/admin-profile" component={UniProfilePage} />
        <Route exact path="/events">
          <PageTemplate page="events" />
        </Route>
        <Route exact path="/my-groups">
          <PageTemplate page="mygroups" />
        </Route>
        <Route exact path="/my-events">
          <PageTemplate page="myevents" />
        </Route>
        <Route exact path="/single-group">
          <PageTemplate page="singleGroup" />
        </Route>
        <Route exact path="/my-account" component={AccountPage} />
        <Route exact path="/dashboard" component={AdminPage} />
      </Switch>
    </Router>
  );
}

export default App;

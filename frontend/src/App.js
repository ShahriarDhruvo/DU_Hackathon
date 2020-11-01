import React from "react";
import "./styles/styles.scss";
import "./components/assets/fonts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EmailConfirmationSent from "./components/generic/EmailConfirmationSent";
import EmailConfirm from "./components/generic/EmailConfirm";
import NotFound from "./components/generic/NotFound";

library.add(fas);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/email/confirmation/sent"
          component={EmailConfirmationSent}
        />
        <Route exact path="/email/confirmation/:key" component={EmailConfirm} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../store";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../components/accounts/Login";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./layout/Alerts";
import { Container } from "semantic-ui-react";
import Dashboard from "./dashboard/Dashboard";
import PrivateRoute from "./common/PrivateRoute";
import OwnHeader from "./layout/OwnHeader";

const alertOptions = {
  timeout: 3000,
  position: "bottom center"
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <OwnHeader />
            <Container>
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
              </Switch>
            </Container>
            <Alerts />
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { Button, Form } from "semantic-ui-react";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="username"
            onChange={this.onChange}
            value={username}
            id="username"
            placeholder="Username"
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={this.onChange}
            value={password}
            id="password"
            placeholder="Password"
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.reducerAuth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { login }
)(Login);

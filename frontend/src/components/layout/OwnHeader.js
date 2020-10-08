import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment, Sidebar, Button, Menu, Icon, Image } from "semantic-ui-react";
import Notifications from "./Notification";

export class OwnHeader extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  state = { activeItem: "" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { isAuthenticated, user } = this.props.auth;
    var user_status = false;
    if (user) {
      user_status = user.is_superuser;
    }
    const authLinks = <strong>{user ? <Notifications /> : ""}</strong>;

    const guestLinks = (
      <strong>
        <Link to="/login">Login</Link>
      </strong>
    );

    return (
      <Segment inverted color="blue">
        <Menu color="blue" inverted>
          <Menu.Item onClick={this.props.sidebar}>
            <strong>Reddit TopLinks</strong>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>{isAuthenticated ? authLinks : guestLinks}</Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.reducerAuth
});
export default connect(
  mapStateToProps,
  {}
)(OwnHeader);

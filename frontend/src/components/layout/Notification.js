import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dropdown, Image, Icon, Label, Menu } from "semantic-ui-react";
import { logoutUser } from "../../actions/auth";
import { getUser } from "../../actions/auth";

export class Notification extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    const { user } = this.props.auth;
    const trigger = (
      <span>
        <Image src={user.subreddit.icon_img} size="tiny" circular />
        Hello, {user.name}{" "}
      </span>
    );
    return (
      <Fragment>
        <Dropdown trigger={trigger} pointing="top right" icon={null}>
          <Dropdown.Menu>
            <Dropdown.Item icon="user circle outline" text="Profile" />
            <Dropdown.Divider />
            <Dropdown.Item onClick={this.props.logoutUser}>
              <Link to="/login" style={{ color: "black" }}>
                <Icon color="black" name="sign-out" />
                Logout
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.reducerAuth
});
export default connect(
  mapStateToProps,
  {
    logoutUser,
    getUser
  }
)(Notification);

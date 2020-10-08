import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getUser } from "../../actions/auth";
import { Segment } from "semantic-ui-react";
import Subreddits from "../subreddits/Subreddits";
import { getSubreddits } from "../../actions/subreddits";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getSubreddits();
  }
  render() {
    return (
      <Fragment>
        {this.props.user ? <h1>{this.props.user.name}</h1> : ""}
        <Segment>
          <Subreddits />
        </Segment>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.reducerAuth.user,
  token: state.reducerAuth.token
});

export default connect(
  mapStateToProps,
  { getUser, getSubreddits }
)(Dashboard);

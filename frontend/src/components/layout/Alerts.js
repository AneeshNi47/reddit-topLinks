import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (message !== prevProps.message) {
      if (message.userLoaded) alert.success(message.userLoaded);
    }
    if (error !== prevProps.errors) {
      if (error.msg.value) alert.error(`value: ${error.msg.value.join()}`);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.reducerErrors,
  message: state.reducerMessages
});
export default connect(mapStateToProps)(withAlert()(Alerts));

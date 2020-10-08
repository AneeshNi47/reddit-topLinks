import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getSubreddits, getPost } from "../../actions/subreddits";
import { Header, Image } from "semantic-ui-react";
import CountUp from "react-countup";

export class Subreddits extends Component {
  componentDidMount() {
    this.props.getSubreddits();
    console.log("subreddit");
  }
  render() {
    return (
      <Fragment>
        {this.props.subreddits.map(subreddit => (
          <Header
            as="h2"
            onClick={() => this.props.getPost(subreddit.data.url)}
          >
            <Image circular src="https://picsum.photos/200 " />{" "}
            {subreddit.data.display_name}
            <Header.Subheader>{subreddit.data.url}</Header.Subheader>
            {this.props.posts ? (
              <Header.Subheader>
                <CountUp end={this.props.posts.length} />
              </Header.Subheader>
            ) : (
              ""
            )}
          </Header>
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  subreddits: state.reducerSubreddits.subreddits,
  posts: state.reducerSubreddits.posts
});

export default connect(
  mapStateToProps,
  { getSubreddits, getPost }
)(Subreddits);

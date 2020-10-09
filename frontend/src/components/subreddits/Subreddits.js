import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getSubreddits, getPost, getPostData } from "../../actions/subreddits";
import { Header, Image, List, Icon, Button, Label } from "semantic-ui-react";
import CountUp from "react-countup";
import { Pie } from "react-chartjs-2";

export class Subreddits extends Component {
  componentDidMount() {
    this.props.getSubreddits();
  }
  render() {
    return (
      <Fragment>
        <List horizontal divided size="massive">
          {this.props.subreddits.map(subreddit => (
            <List.Item>
              <Image avatar src={subreddit.data.header_img} />
              <List.Content>
                <Header as="h2">
                  <Header.Content>
                    {subreddit.data.display_name}
                    <Header.Subheader>{subreddit.data.url}</Header.Subheader>
                  </Header.Content>
                </Header>
              </List.Content>
              <br />
              <Button
                as="div"
                labelPosition="right"
                onClick={() =>
                  this.props.getPostData(subreddit.data.display_name)
                }
              >
                <Button color="red">
                  <Icon name="users" />
                  Subscribers
                </Button>
                <Label as="a" basic color="red" pointing="left">
                  <CountUp end={subreddit.data.subscribers} />
                </Label>
              </Button>
            </List.Item>
          ))}
        </List>
        {this.props.postsData ? (
          <div className="col-xl-4 col-lg-5">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Total Link Posts {this.props.postsData[0].linkPost_count}
                </h6>
              </div>
              <div className="card-body">
                <div className="chart-pie pt-4">
                  <Pie
                    data={this.props.postsData[0]}
                    width={100}
                    height={100}
                    options={{ maintainAspectRation: false }}
                  />
                </div>
                <hr />
                Considering Top {this.props.postsData[0].total_postCount} Posts
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  subreddits: state.reducerSubreddits.subreddits,
  posts: state.reducerSubreddits.posts,
  postsData: state.reducerSubreddits.postsData
});

export default connect(
  mapStateToProps,
  { getSubreddits, getPost, getPostData }
)(Subreddits);

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getSubreddits, getPost, getPostData } from "../../actions/subreddits";
import {
  Header,
  Image,
  Modal,
  Grid,
  Icon,
  Segment,
  Button,
  Label,
  Divider,
  Card
} from "semantic-ui-react";
import CountUp from "react-countup";
import { Pie } from "react-chartjs-2";

export class Subreddits extends Component {
  state = {
    loading: false
  };
  openLoading = () => this.setState({ loading: true });
  closeLoading = () => this.setState({ loading: false });
  componentDidMount() {
    this.props.getSubreddits();
  }
  render() {
    const { loading } = this.state;
    return (
      <Fragment>
        <Modal
          basic
          onClose={() => this.closeLoading()}
          onOpen={() => this.openLoading()}
          open={loading}
          size="small"
        >
          <Modal.Content>
            <Icon loading size="huge" name="spinner" />
          </Modal.Content>
        </Modal>
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <Card.Group>
                {this.props.subreddits.map(subreddit => (
                  <Card key={subreddit.id}>
                    <Card.Content>
                      <Image
                        floated="right"
                        size="small"
                        avatar
                        src={subreddit.data.header_img}
                      />
                      <Card.Header>{subreddit.data.display_name}</Card.Header>
                      <Card.Meta>{subreddit.data.url}</Card.Meta>
                      <Card.Description>
                        <Button as="div" labelPosition="right">
                          <Button color="red">
                            <Icon name="users" />
                            Subscribers
                          </Button>
                          <Label as="a" basic color="red" pointing="left">
                            <CountUp end={subreddit.data.subscribers} />
                          </Label>
                        </Button>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button
                          basic
                          color="green"
                          onClick={() => {
                            this.props.getPostData(subreddit.data.display_name);
                            this.openLoading();
                          }}
                        >
                          Reports
                        </Button>
                        <Button
                          basic
                          color="red"
                          onClick={() => {
                            this.props.getPost(subreddit.data.url);
                            this.openLoading();
                          }}
                        >
                          Posts
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            </Grid.Column>
            <Grid.Column>
              {this.props.postsData ? (
                <Card>
                  <Pie
                    data={this.props.postsData[0]}
                    width={100}
                    height={100}
                    options={{ maintainAspectRation: false }}
                  />
                  <Card.Content>
                    <Card.Header>
                      Total Link Posts {this.props.postsData[0].linkPost_count}
                    </Card.Header>
                    <Card.Meta>
                      <span className="date">
                        Most Shared User: {this.props.postsData[0].top_user}
                      </span>
                    </Card.Meta>
                    <Card.Description>
                      Considering Top {this.props.postsData[0].total_postCount}{" "}
                      Posts
                    </Card.Description>
                  </Card.Content>
                </Card>
              ) : (
                ""
              )}
            </Grid.Column>
          </Grid>
          <Divider vertical>And</Divider>
        </Segment>
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

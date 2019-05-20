import React, { Component } from "react";
import { withAuthorization } from "../Session";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false, username: null };
  }
  // instead of useing the onStateChange we'll apply the onAuthUserListener
  componentDidMount() {
    this.listener = this.props.firebase.onAuthUserListener(
      authUser => {
        this.setState({ authUser });
        this.setState({ username: authUser.username });
      },
      () => {
        this.setState({ authUser: null });
      }
    );
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }
  render() {
    const { username } = this.state;
    return (
      <Paper>
        <h1>User Info Form of : {username} </h1>
        <form onSubmit={this.onSubmit}>
          <input name="gender" placeholder="gender" />
          <input name="age" placeholder="age" />
          <input name="weight" placeholder="weight" />
          <input name="goalweight" placeholder="weight goal" />
          <input name="active" placeholder="active" />
          <input name="sportActivity" placeholder="sportActivity" />
          <input
            name="trainningDays"
            placeholder=" how often do you workout "
          />
        </form>
      </Paper>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserInfo);

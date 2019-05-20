import React, { Component } from "react";
import { withAuthorization, withEmailVerification } from "../Session";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";

//with authorizartion is used to verify  that user is authorized to
// access certain pages, for instance - user has access only to admin
// and home only when is signed in, once logged out the user will
// only have access to sign in and landing pages

class AdminPg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: []
    };
  }

  // functionality for admin page
  componentDidMount() {
    this.setState({ loading: true });
    // here we'll fetch the users info from real time DB
    /*ON(), method  recieves a callback function. it registers a continous listener 
    that triggers everytime something changes 
    once(): is method that registers a listener that will be called only once, but in this case we're 
    trying to keep a fresh list of users at all times , whihc is why we'll use ON method instead on ONCE
    */
    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));
      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  // and as usual we'll remove the listener to avoid memory leak
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <h1> Admin</h1>
        {loading && <div>loading......</div>}
        <UsersList users={users} />
      </div>
    );
  }
}

const UsersList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>User Name</strong> {user.username}{" "}
        </span>
        <span>
          <strong>E-mail</strong> {user.email}
        </span>
      </li>
    ))}
  </ul>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AdminPg);

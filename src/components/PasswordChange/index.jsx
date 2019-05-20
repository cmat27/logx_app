import React, { Component } from 'react';
import { withFirebase } from '../Firebase'

//create am initial constant
const INITIAL_STATE = {
  password_1: '',
  password_2: '',
  error: null
}

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  // Add an Onsubmit functionality to update password
  onSubmit = (event) => {
    const { password_1 } = this.state;

    this.props.firebase
      .doPasswordUpdate(password_1)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        this.setState({ error })
      })
    event.preventDefault();
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {
    const { password_1, password_2, error } = this.state;
    const isInvalid = password_1 !== password_2 || password_1 === '' || password_2 === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='passsword_1'
          value={password_1}
          onChange={this.onChange}
          type='text'
          placeholder='new password'
        />

        <input
          name='password_2'
          value={password_2}
          onChange={this.onChange}
          type='text'
          placeholder='Confirm new password'
        />

        <button disabled={isInvalid} type='submit' onClick={this.onSubmit}> Update Password</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);



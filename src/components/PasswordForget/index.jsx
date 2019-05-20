import React from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";


const PasswordForgetPg = () => {
  return (
    <div>
      <h1>Password forgot </h1>
      <PasswordForgetForm />
    </div>
  );
};
// initial sate
const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  // functionalities to reset password
  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    // prevent default
    event.preventDefault();
  };

  // on change function
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    //run a quick validation 
    const isInvalid = email === '' ? true : false;

    return (<form onSubmit={this.onSubmit}>
      <input
        name='email'
        value={email}
        onChange={this.onChange}
        type='text'
        placeholder='E-mail'
      />
      <button disabled={isInvalid} type='submit'> Reset Password </button>

      {error && <p>{error.message}</p>}


    </form>);
  }

}
//we'll create a link to this module to be made 
// available and displayes as an option in sign in module 
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}> Forgot Password ...? </Link>
  </p>
)
export default PasswordForgetPg;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)

export { PasswordForgetForm, PasswordForgetLink }
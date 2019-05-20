import React from "react";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
/* this validation will be used to verify if user has varified their email address
 * in case that user has not, it will display a message asking them to do so
 * additionally we'll add a button to resend the verification email in case the user
 * has/had deleted their email.
 */
const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes("password");

const withEmailVerification = Component => {
  class WithEmailVeridfication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isSent: false
      };
    }

    onSendEmailVerification = () => {
      this.props.firebase.doSendEmailVerification().then(() => {
        this.setState({ isSent: false });
      });
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <p>
                    In order to have full access, you must verify your Email
                    address E-Mail confirmation sent to: {authUser.email} Check
                    you E-Mails (Spam folder included) for a confirmation
                    E-Mail. Refresh this page once you confirmed your E-Mail.
                  </p>
                ) : (
                  <p>
                    Verify your E-Mail: Check you E-Mails (Spam folder included)
                    for a confirmation E-Mail or send another confirmation
                    E-Mail.
                  </p>
                )}

                <button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                >
                  Send confirmation E-Mail
                </button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVeridfication);
};

export default withEmailVerification;

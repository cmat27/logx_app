import AuthUserContext from "./context";
import withAuthentication from "./withAuthentication";
import withAuthorization from "./withAuthorization";
import withEmailVerification from "./withEmailVerification";

/*
    this will be user as the entry point to this module
    thus the App component will have acess to this and ber able to use 
    the new context to provide the authemticated user to the components that need it 
*/
export {
  AuthUserContext,
  withAuthentication,
  withAuthorization,
  withEmailVerification
};

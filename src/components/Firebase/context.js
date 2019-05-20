import React from "react";

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
/* 
    rather than importing firebase class into every component when needed, we'll use th context to creare 
    a sort of singleton class to be used throughout the entire application 
    given that this will be at the top of hierchy, it will only be intanciated once at the top level 
    - Create Context - creates two components tyhe firebaseContext provide and consumer; 
    provider: generates the firebase instance at top onlky once
    and Consumer: is a component used to retrieve the information generated on the initial 
    instance

*/

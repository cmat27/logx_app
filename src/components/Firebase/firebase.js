import app from "firebase";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: (process.env.REACT_APP_KEY =
    "AIzaSyDAMMNLKC9Nyb6b0edUK8e81wceakXClEw"),
  authDomain: (process.env.REACT_APP_AUTH_DOMAIN =
    "workout-log-1f3ee.firebaseapp.com"),
  databaseURL: (process.env.REACT_APP_DATABASE_URL =
    "https://workout-log-1f3ee.firebaseio.com"),
  projectId: (process.env.REACT_APP_PROJECT_ID = "workout-log-1f3ee"),
  storageBucket: (process.env.REACT_APP_STORAGE_BUCKET =
    "workout-log-1f3ee.appspot.com"),
  messagingSenderId: (process.env.REACT_APP_MESSAGING_SENDER_TO =
    "768325286122")
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    //used to store users or data in general on the database using firebase API
    this.db = app.database();
  }
  /*  USE AUTH  API
        this will be use to validate/authentcate users when logging in or signing up 
    */
  // create user
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Log In--  ** Note to future me; '{}' after => will breake the app
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  //confirmation email - send to user when registered for first time
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: (process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT =
        "http://localhost:3000")
    });

  onAuthUserListener = (next, fallback) => {
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapShot => {
            const dbUser = snapShot.val();

            if (!dbUser.role) {
              dbUser.roles = {};
            }

            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
  };
  //sign out
  doSignOut = () => this.auth.signOut();
  // password reset
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  //password update
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  //* USER API  */
  // the REF method will match the location of the entities(user) will be stored  in Firebase real time API
  // if on eattentts to remove userid 5 wil look like user/5  and it will be removed from db
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");
}

export default Firebase;

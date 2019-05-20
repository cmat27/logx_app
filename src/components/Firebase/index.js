import FirebaseContext, { withFirebase } from "./context";
import Firebase from "./firebase";

export default Firebase;

export { FirebaseContext, withFirebase };

/* 
    here we create this index.js in order to export the firebase functionality
    to the rest of the application;  functionalities include ( firebase class , firebase context, consumer and 
        provider component)

    the Firebase Folder is used to shared/provide  a firevace instance to the entire application 
    in the src/index.js 

    we only have to create the Firebase instance once and pass the values as props to the 
    rest of reacrt app 
*/

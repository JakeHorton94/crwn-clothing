import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAXGRjHr3wKg_IboqdKdD5l0UHMlPaYCQ4",
    authDomain: "crwn-clothing-db-c9a09.firebaseapp.com",
    databaseURL: "https://crwn-clothing-db-c9a09.firebaseio.com",
    projectId: "crwn-clothing-db-c9a09",
    storageBucket: "crwn-clothing-db-c9a09.appspot.com",
    messagingSenderId: "781345889057",
    appId: "1:781345889057:web:779466d30338a3397cbc60"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log("error creating user", error.message);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
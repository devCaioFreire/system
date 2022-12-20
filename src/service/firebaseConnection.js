import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDybM8hpPvPqewQkc0eH81jaIYBqCeVlxE",
    authDomain: "call-system666.firebaseapp.com",
    projectId: "call-system666",
    storageBucket: "call-system666.appspot.com",
    messagingSenderId: "201394331897",
    appId: "1:201394331897:web:e1bb660bcf0e618b25c228",
    measurementId: "G-7PJ1KWC167"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;

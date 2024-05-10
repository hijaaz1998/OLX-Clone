import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "fir-cb5a5.firebaseapp.com",
    projectId: "fir-cb5a5",
    storageBucket: "fir-cb5a5.appspot.com",
    messagingSenderId: "645871075737",
    appId: "1:645871075737:web:8b738e7be6e68f8765d308",
    measurementId: "G-TWFB0X3GM2"
  };

export default firebase.initializeApp(firebaseConfig);
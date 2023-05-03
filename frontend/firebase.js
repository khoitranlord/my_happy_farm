import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAEv42mSAkn3-gBSTwRfbKYRV-HyARc0sM",
  authDomain: "okea-a0fe0.firebaseapp.com",
  databaseURL: "https://okea-a0fe0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "okea-a0fe0",
  storageBucket: "okea-a0fe0.appspot.com",
  messagingSenderId: "857435971697",
  appId: "1:857435971697:web:053d961f1c0cc4bf67fbd0",
  measurementId: "G-BPHSSYW851"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, db, provider};
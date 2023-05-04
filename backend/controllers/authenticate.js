import { 
  getAuth, onAuthStateChanged, 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginlog } from "./loginlog.js"


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

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const sessionTimeout = 30000;     // time limit for a session to be valid in miliseconds


export async function retrieveSession(){
  // Get session from AsyncStorage
  try{
    loginSession = await AsyncStorage.getItem('loginSession');
    if (loginSession == null){
      console.log("No session saved !");
      return null;
    }
    loginSession = JSON.parse(loginSession);
    if (Date.now() - Number(loginSession['timestamp']) > sessionTimeout){
      console.log("Session timeout !")
      return null;
    }
    else{
      console.log("Successfully retrieved session:", loginSession)
      return loginSession;
    }
  }
  catch (error) {
    console.log('Error retrieving session:', error);
  }
};

// add a function to store session

export async function authenticateUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully authenticated
        const user = userCredential.user;
        console.log('User successfully authenticated:',user.email);
        
        var storedSession = JSON.stringify({
          'email':email,
          'password':password,
          'timestamp': Date.now()
        });
        AsyncStorage.setItem('loginSession', storedSession);
        console.log('Stored session:',storedSession);
        loginlog(user.email)
        return [1, user.email];
      })
      .catch((error) => {
        // An error occurred during authentication
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Auth err:', errorCode, errorMessage);
        return [-1, errorMessage];
      });
  }

export function logOut(){
    signOut(auth)
}

const testEmail = 'admin@mail.vn';
const testPass = 'admin123';

// // Example:
// authenticateUser(testEmail, testPass).then((userEmail) => console.log(userEmail));

// Create a user
export function newUser(email, password){
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    console.log('user created')
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
});
}

// newUser(testEmail, testPass);
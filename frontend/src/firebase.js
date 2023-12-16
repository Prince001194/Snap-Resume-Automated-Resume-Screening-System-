import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwS2tW24AkurAxmo_4A40fGW8FxUkJwAA",
  authDomain: "tapopproject.firebaseapp.com",
  projectId: "tapopproject",
  storageBucket: "tapopproject.appspot.com",
  messagingSenderId: "114900488154",
  appId: "1:114900488154:web:34d16f8c1b2c8534d8fae3",
  measurementId: "G-MHDHR3ERVH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'})
export {provider,auth,db};

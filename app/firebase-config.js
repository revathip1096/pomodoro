import { initializeApp } from "firebase/app"; 
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAzXpas_KODGd9VBVGdx9fbdCN-eUf7BmQ",
    authDomain: "js50-46681.firebaseapp.com",
    projectId: "js50-46681",
    storageBucket: "js50-46681.appspot.com",
    messagingSenderId: "629628026284",
    appId: "1:629628026284:web:203145fea21e74d2900e09",
    measurementId: "G-3PS2ZETFQN"
  };
  const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider =new GoogleAuthProvider();
 
export {auth , provider};
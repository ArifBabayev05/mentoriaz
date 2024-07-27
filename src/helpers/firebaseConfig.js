import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: "AIzaSyAdzVr-ULFqVS5vXB0QhKr5ww82QyojnSI",
  authDomain: "mentoriaz.firebaseapp.com",
  projectId: "mentoriaz",
  storageBucket: "mentoriaz.appspot.com",
  messagingSenderId: "137134128891",
  appId: "1:137134128891:web:6ef7682b513747645d3a5e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, toast };

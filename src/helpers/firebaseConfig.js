// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Firebase yapılandırma
const firebaseConfig = {
  apiKey: "AIzaSyAdzVr-ULFqVS5vXB0QhKr5ww82QyojnSI",
  authDomain: "mentoriaz.firebaseapp.com",
  projectId: "mentoriaz",
  storageBucket: "mentoriaz.appspot.com",
  messagingSenderId: "137134128891",
  appId: "1:137134128891:web:6ef7682b513747645d3a5e"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firebase Authentication servisini başlat
const auth = getAuth(app);

// Google Auth Provider'ını başlat
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (isMentor, navigate, toast) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const response = await fetch('http://localhost:5000/api/auth/google-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: user.displayName, email: user.email, isMentor })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    const data = await response.json();
    localStorage.setItem('userInfo', JSON.stringify(data));
    toast.success('Successfully logged in!');
    navigate('/dashboard');
  } catch (error) {
    toast.error(`Error: ${error.message}`);
  }
};

export { auth, signInWithGoogle };

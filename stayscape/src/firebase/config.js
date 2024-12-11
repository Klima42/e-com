// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBfx2Pu4exypiLTNZhC7WxagS1fR37IVno",
  authDomain: "stayscape-4781c.firebaseapp.com",
  projectId: "stayscape-4781c",
  storageBucket: "stayscape-4781c.firebasestorage.app",
  messagingSenderId: "665487091333",
  appId: "1:665487091333:web:2d8e09481cf1d4d7d92bec",
  measurementId: "G-F8BJCN5VNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Authentication service
export const authService = {
  // Register new user
  register: async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with name
      await userCredential.user.updateProfile({
        displayName: name
      });
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Login with email/password
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Login with Google
  loginWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Logout
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Subscribe to auth state changes
  subscribeToAuthChanges: (callback) => {
    return onAuthStateChanged(auth, callback);
  }
};

export default auth;
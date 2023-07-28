// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCAWXis-ZRKbgrdiHvH4QqEqhGbZs0UvWc',
  authDomain: 'movies-5a33e.firebaseapp.com',
  projectId: 'movies-5a33e',
  storageBucket: 'movies-5a33e.appspot.com',
  messagingSenderId: '829028635479',
  appId: '1:829028635479:web:910409a76eb76775de2412',
  measurementId: 'G-W1NL4HSKZ7',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);

import { writable } from 'svelte/store';
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth"


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "auth-development-33b83",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export const signup = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
}

export const signin = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
}

export const signout = async () => {
  await signOut(auth)
}

export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email)
}

export const googleSignin = async () => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
}

export const githubSignin = async () => {
  const provider = new GithubAuthProvider()
  await signInWithPopup(auth, provider)
}

export const authStore = writable({
  isLoggedIn: false,
  firebaseControlled: false,
  user: null,
});

onAuthStateChanged(auth, async (user) => {
  console.log('AUTH STATE CHANGED', user)
  authStore.set({
    firebaseControlled: true,
    isLoggedIn: user !== null,
    user: user,
  });
})
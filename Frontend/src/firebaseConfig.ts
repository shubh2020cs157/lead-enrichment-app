import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUqpze7wkKwCCssA05EjaYX-mevC78uBc",
  authDomain: "kuration-sample-test.firebaseapp.com",
  projectId: "kuration-sample-test",
  storageBucket: "kuration-sample-test.firebasestorage.app",
  messagingSenderId: "552794370687",
  appId: "1:552794370687:web:201fc51ccee27c23bf054a",
  measurementId: "G-D1E367X0DN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
  }
};

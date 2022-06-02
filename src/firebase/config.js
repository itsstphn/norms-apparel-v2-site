import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVxWae2boJ2LzMOBGJ0boUq9kB7NBNzRw",
  authDomain: "norms-apparel-v2.firebaseapp.com",
  projectId: "norms-apparel-v2",
  storageBucket: "norms-apparel-v2.appspot.com",
  messagingSenderId: "838612560174",
  appId: "1:838612560174:web:22121e2a79843d3688b2bf",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

export { db, auth, storage };

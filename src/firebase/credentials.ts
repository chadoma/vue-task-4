import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

import { Credentials } from './types';

export const credentials: Credentials = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(credentials);

const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth}


import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBCPoHhN9A4qSSolpAds3ilknY1tSAegl0",
  authDomain: "points-3f6f1.firebaseapp.com",
  databaseURL: "https://points-3f6f1.firebaseio.com",
  projectId: "points-3f6f1",
  storageBucket: "points-3f6f1.appspot.com",
  messagingSenderId: "686364364120",
  appId: "1:686364364120:web:8f2ec4a97223700c14292d"
};

firebase.initializeApp(config);

export const db = firebase.firestore();
// Using offline capabilities with https://firebase.google.com/docs/firestore/manage-data/enable-offline
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
db.enablePersistence().catch(console.error);
db.disableNetwork();

// https://stackoverflow.com/questions/48929728/how-to-clear-firestore-persistence-data
export const clearCache = () =>
  db.clearPersistence().catch(error => {
    console.error("Could not enable persistence:", error.code);
  });
export const mode = "real";

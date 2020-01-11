//import firebaseTesting from "@firebase/testing";
import firebase from "firebase/app";
import "firebase/firestore";
//console.log(firebaseTesting);
const config = {
  apiKey: "AIzaSyBCPoHhN9A4qSSolpAds3ilknY1tSAegl0",
  authDomain: "points-3f6f1.firebaseapp.com",
  databaseURL: "https://points-3f6f1.firebaseio.com",
  projectId: "points-3f6f1",
  storageBucket: "points-3f6f1.appspot.com",
  messagingSenderId: "686364364120",
  appId: "1:686364364120:web:8f2ec4a97223700c14292d"
};

// Restore app from JSON https://levelup.gitconnected.com/firebase-import-json-to-firestore-ed6a4adc2b57

export let db;
let app = {};

const shouldUseTestDB = queryString => /fake[dD][bB]/.test(queryString);

// export const initializeFirestore = () => {
//   if (shouldUseTestDB(window.location.search)) {
//     app = firebaseTesting
//       .initializeAdminApp({ projectId: config.projectId })
//       .firestore();
//   } else {
//     app = firebase.initializeApp(config);
//   }
//   app = firebase.initializeApp(config);
//   db = firebase.firestore(app);
//   // Using offline capabilities with https://firebase.google.com/docs/firestore/manage-data/enable-offline
//   db.settings({
//     cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
//   });
//   db.enablePersistence().catch(console.error);
//   if (/fake[dD][bB]/.test(window.location.search)) {
//     db.disableNetwork();
//   }
// };
// initializeFirestore();
app = firebase.initializeApp(config);
db = firebase.firestore(app);
// Using offline capabilities with https://firebase.google.com/docs/firestore/manage-data/enable-offline
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
db.enablePersistence().catch(console.error);
if (shouldUseTestDB(window.location.search)) {
  db.disableNetwork();
}
export const clearCache = () => {
  // if (shouldUseTestDB(window.location.search)) {
  //   // https://github.com/firebase/quickstart-nodejs/blob/master/firestore-emulator/javascript-quickstart/test/test.js
  //   return firebase.clearFirestoreData({ projectId: config.projectId });
  // }
  // https://stackoverflow.com/questions/48929728/how-to-clear-firestore-persistence-data
  indexedDB.deleteDatabase("firestore/[DEFAULT]/points-3f6f1/main");
  // app.delete();
  // return firebase
  //   .firestore()
  //   .clearPersistence()
  //   .then((...args) => {
  //     console.log("Deleted Cache", ...args);
  //     return initializeFirestore();
  //   })
  //   .catch(error => {
  //     console.error(error);
  //     console.error("Could not enable persistence:", error.code);
  //   });
};
export const mode = "real";

import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  "apiKey": "",
  "authDomain": "",
  "databaseURL": "",
  "storageBucket": ""
};

firebase.initializeApp(config);

export const database = firebase.database();

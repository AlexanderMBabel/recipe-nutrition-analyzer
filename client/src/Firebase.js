import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAgjYwhTway9p6MW4YMbuEqHE7vpoSLLZU',
  authDomain: 'recipe-nutrition-86d1a.firebaseapp.com',
  databaseURL: 'https://recipe-nutrition-86d1a.firebaseio.com',
  projectId: 'recipe-nutrition-86d1a',
  storageBucket: 'recipe-nutrition-86d1a.appspot.com',
  messagingSenderId: '332446045570',
  appId: '1:332446045570:web:e8151c44cf786f9f416b9b'
};

firebase.initializeApp(config);

export default firebase;

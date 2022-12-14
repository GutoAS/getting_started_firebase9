import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuPo6ZqbMoG5C_ESvo-82cX_95sJHtVF4",
  authDomain: "fir-9-dojo-5f136.firebaseapp.com",
  projectId: "fir-9-dojo-5f136",
  storageBucket: "fir-9-dojo-5f136.appspot.com",
  messagingSenderId: "214458460903",
  appId: "1:214458460903:web:f73cb9c88562b91b575042",
  measurementId: "G-K0ZPLM1SY5",
};

// init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "books");

//get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

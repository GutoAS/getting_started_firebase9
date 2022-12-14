import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  getFirestore,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

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

//queriess
const q = query(colRef, orderBy("createdAt"));

// // const q = query(colRef, where("author", "==", "Dalte Soberano"));
// // const q = query(colRef, where("author", "==", "Dalte Soberano"),orderBy("title","desc"));

//real time collection data
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// // onSnapshot(colRef, (snapshot) => {
// //   let books = [];
// //   snapshot.docs.forEach((doc) => {
// //    books.push({ ...doc.data(), id: doc.id });
// //   });
// //   console.log(books);
// // });

// // get collection data
// // getDocs(colRef)
// //   .then((snapshot) => {
// //     let books = [];
// //     snapshot.docs.forEach((doc) => {
// //       books.push({ ...doc.data(), id: doc.id });
// //     });
// //     console.log(books);
// //   })
// //   .catch((err) => {
// //     console.log(err.message);
// //   });

// adding docs
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// get a single document
const docRef = doc(db, "books", "M2Pqdrrbd0HQXMMaRN6r");

onSnapshot(docRef, (doc) => {
  console.log(doc.data()), doc.id;
});

// // getDoc(docRef).then((doc) => {
// //   console.log(doc.data()), doc.id;
// // });

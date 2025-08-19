
// /**
//  * @author Narendra Khadayat
//  */
// //

// Import the functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, updateDoc, increment, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// --FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyBs8QR5Mqu4vZ38Ng6qaB82LAslh711fIo",
  authDomain: "baril-visitor-counter-dadb4.firebaseapp.com",
  projectId: "baril-visitor-counter-dadb4",
  storageBucket: "baril-visitor-counter-dadb4.appspot.com",
  messagingSenderId: "927792484648",
  appId: "1:927792484648:web:618d6e7ccbead863f9801d"
};


// INT Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a reference from the HTML element
const visitorCountElement = document.getElementById('visitorCount');

//to update and listen to the visitor count
async function updateAndListen() {
  if (!visitorCountElement) return;

  // ---Loading... text"
  visitorCountElement.textContent = 'Loading...';
  visitorCountElement.classList.add('is-loading');
  visitorCountElement.classList.remove('is-visible');

  const counterRef = doc(db, 'visitors', 'total');

  try {
    await updateDoc(counterRef, { count: increment(1) });
  } catch (error) {
    if (error.code === 'not-found') {
      await setDoc(counterRef, { count: 1 });
    } else {
      console.error("Error updating count:", error);
    }
  }

  const unsubscribe = onSnapshot(counterRef, (doc) => {
    if (doc.exists()) {
      const currentCount = doc.data().count;
      
      // Remove style and text
      visitorCountElement.classList.remove('is-loading');
      visitorCountElement.textContent = currentCount.toLocaleString();
      
      // Trigger the flip animation
      visitorCountElement.classList.add('is-visible');

      unsubscribe(); 
    }
  }, (error) => {
    console.error("Error listening to visitor count:", error);
    visitorCountElement.classList.remove('is-loading');
    visitorCountElement.textContent = 'Error';
  });
}

// for counter logic
window.addEventListener('load', updateAndListen);

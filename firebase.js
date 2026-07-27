import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyBwn-tv1FJB3HTC-_9ed84WxY-nold0xN4",

authDomain: "leaddeskmini-c97f3.firebaseapp.com",

projectId: "leaddeskmini-c97f3",

storageBucket: "leaddeskmini-c97f3.firebasestorage.app",

messagingSenderId: "962203345467",

appId: "1:962203345467:web:427f02bd7ad8f82b36b21e"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
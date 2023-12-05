import { getApps, initializeApp } from "firebase/app";

// Hovedfunktionen, der definerer den samlede app-komponent
function App() {
// Firebase konfigurationsobjekt, der indeholder API-nøgler og andre opsætningsoplysninger
  const firebaseConfig = {
    apiKey: "AIzaSyANhYOvCJRE8Ue8cdf6Ib3Z5EGQLvElUVw",
    authDomain: "stampaway-64e61.firebaseapp.com",
    databaseURL: "https://stampaway-64e61-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "stampaway-64e61",
    storageBucket: "stampaway-64e61.appspot.com",
    messagingSenderId: "1011228104584",
    appId: "1:1011228104584:web:bbe3892fdbf3b59a324c3d"
  };
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log('Firebase On!'); // Udskriver besked i konsollen, når Firebase er aktiveret
  }
}
// Eksporterer App-komponenten som standard eksport for at gøre den tilgængelig for resten af applikationen
export default App;
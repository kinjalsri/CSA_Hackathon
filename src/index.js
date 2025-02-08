import { db } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore"; 

async function addData() {
  try {
    const docRef = await addDoc(collection(db, "alerts"), {
      title: "Test Alert",
      message: "This is a sample alert for testing.",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

addData();
import { db } from "./firebase.js";  // Firebase configuration
import { collection, addDoc } from "firebase/firestore";
import Papa from "papaparse";  // Import PapaParse for CSV parsing
import fs from "fs";  // Import fs to read the CSV file

// Read CSV file from your local filesystem (if running on Node.js)
const csvFilePath = "./dataset.csv";  // Adjust path to your CSV file

// Function to parse the CSV and upload it to Firestore
async function uploadCSVToFirestore() {
  try {
    // Read the CSV file and parse it
    const csvData = fs.readFileSync("csa-hackathon/disasterIND.csv", "utf8");
    
    Papa.parse(csvData, {
      header: true,   // Treat the first row as headers
      skipEmptyLines: true,
      complete: async function(results) {
        // Upload each row of the parsed CSV data to Firestore
        for (let data of results.data) {
          const docRef = await addDoc(collection(db, "alerts"), data);
          console.log("Document written with ID: ", docRef.id);
        }
      },
      error: function(error) {
        console.error("Error parsing CSV: ", error.message);
      }
    });
  } catch (e) {
    console.error("Error uploading CSV: ", e);
  }
}

// Call the function to upload data
uploadCSVToFirestore();
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("recordings.db");

// Create the "recordings" table if it doesn't exist
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS recordings (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, title TEXT, duration INTEGER)",
    [],
    () => {
      console.log("Table created successfully.");
    },
    (error) => {
      console.error("Error creating table:", error);
    }
  );
});

// Function to store data in the database
function storeData({ url, title, duration }) {
  console.log("storeData function....");
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO recordings (url, title, duration) VALUES (?, ?, ?)",
      [url, title, duration],
      () => {
        console.log("Record added successfully.");
        alert("Record added successfully.");
      },
      (error) => {
        console.error("Error inserting data:", error);
      }
    );
  });
}

// Function to retrieve all records from the database
function getAllRecords(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT id, url, title, duration FROM recordings",
      [],
      (_, result) => {
        callback(result.rows._array);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  });
}

// Function to update a record in the database
function updateRecord(id, { url, title, duration }) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE recordings SET url = ?, title = ?, duration = ? WHERE id = ?",
      [url, title, duration, id],
      () => {
        console.log(`Record with ID ${id} updated.`);
        alert(`Record with ID ${id} updated.`);
      },
      (error) => {
        console.error("Error updating record:", error);
      }
    );
  });
}

// Function to delete a record from the database
function deleteRecord(id) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM recordings WHERE id = ?",
      [id],
      () => {
        console.log(`Record with ID ${id} deleted.`);
        alert(`Record with ID ${id} deleted.`);
      },
      (error) => {
        console.error("Error deleting record:", error);
      }
    );
  });
}

export { storeData, getAllRecords, updateRecord, deleteRecord };

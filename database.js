import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mydb.db");

export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, password TEXT NOT NULL);`,
      [],
      () => console.log("Database and table created"),
      (_, error) => console.error("Error creating table: " + error)
    );
  });
};

export const insertUser = (email, password, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO users (email, password) VALUES (?, ?);",
      [email, password],
      (_, result) => {
        callback(result.insertId);
      },
      (_, error) => {
        console.error("Error inserting user: " + error);
        callback(null);
      }
    );
  });
};

export const findUserByEmail = (email, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM users WHERE email = ?;",
      [email],
      (_, result) => {
        if (result.rows.length > 0) {
          const user = result.rows.item(0);
          callback(user);
        } else {
          callback(null);
        }
      },
      (_, error) => {
        console.error("Error finding user: " + error);
        callback(null);
      }
    );
  });
};

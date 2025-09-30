import cors from "cors";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import express from "express";
import sqlite3 from "sqlite3";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// SQLite3 setup
const db = new sqlite3.Database("./app.db", (err) => {
  if (err) {
    console.error("Error in SQL setup:", err.message);
  } else {
    console.log("SUCCESS SQL SETUP");
  }
});

// Create users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    google_id TEXT UNIQUE,
    name TEXT,
    email TEXT UNIQUE,
    picture TEXT
  )
`);

const CLIENT_ID = "480005944874-5c0523ra83a42ivf1gk62u43crak29rj.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  return ticket.getPayload();
}


app.post("/auth/google", async (req, res) => {
  try {
    const { token } = req.body;
    const googleUser = await verifyGoogleToken(token);
    const { sub: google_id, name, email, picture } = googleUser;

    db.get("SELECT * FROM users WHERE google_id = ?", [google_id], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (row) {
        const appToken = jwt.sign(
          { id: row.id, email: row.email },
          "YOUR_SECRET_KEY",
          { expiresIn: "1h" }
        );
        return res.json({ token: appToken, user: row });
      } else {
        db.run(
          "INSERT INTO users (google_id, name, email, picture) VALUES (?, ?, ?, ?)",
          [google_id, name, email, picture],
          function (err) {
            if (err) return res.status(500).json({ error: err.message });

            const newUser = { id: this.lastID, google_id, name, email, picture };
            const appToken = jwt.sign(
              { id: newUser.id, email: newUser.email },
              "YOUR_SECRET_KEY",
              { expiresIn: "1h" }
            );
            return res.json({ token: appToken, user: newUser });
          }
        );
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid Google token" });
  }
});

// db.all(
//   "SELECT * FROM inbox WHERE sender=? OR receiver=?",
//   ['venkatanageswarabhadri12@gmail.com', 'venkatanageswarabhadri12@gmail.com'],
//   (err, data) => {
//     if(err){
//       console.error("Error fetching inbox mails:", err);
//       return;
//     }
//     console.log("Inbox mails:", data);
//   }
// );

// db.all(
//   "SELECT * FROM inbox",
//   [],
//   (err, data) => {
//     if(err){
//       console.error("Error fetching inbox mails:", err);
//       return;
//     }
//     console.log(" mails:", data);
//   }
// );


const inbox_table = `CREATE TABLE IF NOT EXISTS INBOX (
    mailId INTEGER PRIMARY KEY AUTOINCREMENT,
    sender TEXT NOT NULL,
    receiver TEXT NOT NULL,
    subject TEXT,
    body TEXT,
    mailType TEXT CHECK(mailType IN ('Important', 'Spam', 'Market', 'Personal')) NOT NULL
);`

db.run(inbox_table, [], (err) => {
  if(err){
    return console.log("ERROR IN CREATING INBOX TABLE");
  }
  return console.log("INBOX TABLE CREATED SUCESSFULLY")
});

app.post('/usermails', (req, res) => {
  const { data } = req.body;
  const q = 'select email from users';
  db.all(q, [], (err, data) => {
    if(err){
      return res.status(500).send({message: "Error in Mails Fetch", success: false});
    }
    const emails = data.map(item => {
      return item.email
    })
    return res.status(200).send({message:"SUCESS", data: emails, success: true});
  });
})

app.post('/addemail', (req, res) => {
  const { sender, receiver, body, subject, mailType } = req.body;
  const q = 'INSERT INTO INBOX (sender, receiver, subject, body, mailType) VALUES (?, ?, ?, ?, ?)';
  db.run(q, [sender, receiver, subject, body, mailType], (err) => {
    if(err){
      return res.status(500).send({message: "FAILED TO SEND MAIL", success: false});
    }
    return res.status(200).send({message: "MAIL SENT SUCCESSFULLY", success: true});
  })
})

/*
const inbox_table = `CREATE TABLE IF NOT EXISTS INBOX (
    mailId INTEGER PRIMARY KEY AUTOINCREMENT,
    sender TEXT NOT NULL,
    receiver TEXT NOT NULL,
    subject TEXT,
    body TEXT,
    mailType TEXT CHECK(mailType IN ('Important', 'Spam', 'Market', 'Personal')) NOT NULL
);`
*/

app.post('/inboxemail', (req, res) => {
  const { mail } = req.body;

  const q = 'select * from inbox where sender=? or receiver = ?';
  db.all(q, [mail, mail], (err, data) => {
    if(err){
      return res.status(500).send({message: "ERROR IN DATA RETRIEVEL", success: false});
    }
    return res.status(200).send({message: "DATA RETRIEVED", data: data, success: true});
  })
})

/*
const inbox_table = `CREATE TABLE INBOX (
    mailId INT AUTO_INCREMENT PRIMARY KEY,
    sender TEXT NOT NULL,
    receiver TEXT NOT NULL,
    subject TEXT,
    body TEXT,
    mailType ENUM('Important', 'Spam', 'Market', 'Personal') NOT NULL
  )`;
*/







app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT http://localhost:${PORT}`);
});

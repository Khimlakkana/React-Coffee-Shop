const express = require("express");
const mysql = require("mysql");
const cors = require("cors")
const bodyParser = require("body-parser");

const dbConfig = require("./config/database");
const entRouter = require("./routers/entRouter")
const promotionRouter = require("./routers/promotionRouter")


const app = express();
const port = 3000;
app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database");
});

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

entRouter(app, connection);
promotionRouter(app, connection);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
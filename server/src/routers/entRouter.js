const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secretKey = "Login-by-entr";

function entRouter(app, connection) {
  //login
  app.post("/login", (req, res) => {
    const { usersname, password } = req.body;

    connection.query(
      "SELECT * FROM entrepreneur WHERE usersname = ?",
      usersname,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(401).json({ message: "Invalid credentials" });
        } else {
          const admin = result[0];
          bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              const token = jwt.sign({ usersname: admin.usersname }, secretKey, {
                expiresIn: "1h",
              });
              res.json({ message: "Login successful", token });
            } else {
              res.status(401).json({ message: "Invalid credentials" });
            }
          });
        }
      }
    );
  });

  //auth
  app.post("/auth", (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, secretKey);
      res.json({ message: "Authentication successful", decoded });
    } catch (err) {
      res
        .status(401)
        .json({ message: "Authentication failed", error: err.message });
    }
  });

  // Read all records
  app.get("/entrepreneurs", (req, res) => {
    connection.query("SELECT * FROM entrepreneur", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Read a single record
  app.get("/entrepreneur/:id", (req, res) => {
    const entrepreneurId = req.params.id;

    connection.query(
      "SELECT * FROM entrepreneur WHERE id = ?",
      entrepreneurId,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(404).json({ message: "Entrepreneur not found" });
        } else {
          res.json(result[0]);
        }
      }
    );
  });

  // Create a new record
  app.post("/entrepreneurs", async (req, res) => {
    const { shopname, detail, province, location, usersname, password } = req.body;

    // Check if required fields are empty
    if (!shopname || !usersname || !password) {
      return res.status(400).json({ message: "Invalid data" });
    }

    try {
      // Hash the password securely before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Assuming 'connection' is the MySQL connection object
      const sql = `INSERT INTO entrepreneur (shopname, detail, province, location, usersname, password)
                   VALUES (?, ?, ?, ?, ?, ?)`;

      connection.query(sql, [shopname, detail, province, location, usersname, hashedPassword], (err, result) => {
        if (err) {
          console.error("Database Error:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ message: "Entrepreneur created successfully", id: result.insertId });
      });
    } catch (error) {
      console.error("Password Hashing Error:", error);
      return res.status(500).json({ message: "Error while hashing password" });
    }
  });



  // Update a record
  app.put("/entrepreneur/:id", (req, res) => {
    const entrepreneurId = req.params.id;
    const { shopname, detail, province, location, usersname, password } = req.body;
    const entrepreneur = { shopname, detail, province, location, usersname, password };

    connection.query(
      "UPDATE entrepreneur SET ? WHERE id = ?",
      [entrepreneur, entrepreneurId],
      (err) => {
        if (err) throw err;
        res.json({ message: "Entrepreneur updated successfully" });
      }
    );
  });

  // Delete a record
  app.delete("/entrepreneur/:id", (req, res) => {
    const entrepreneurId = req.params.id;

    connection.query(
      "DELETE FROM entrepreneur WHERE id = ?",
      entrepreneurId,
      (err) => {
        if (err) throw err;
        res.json({ message: "Entrepreneur deleted successfully" });
      }
    );
  });
}

module.exports = entRouter;

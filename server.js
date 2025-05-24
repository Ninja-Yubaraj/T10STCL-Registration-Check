const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Low, JSONFile } = require("lowdb");

const app = express();
const port = 3000;

// Database setup
const file = new JSONFile("db.json");
const db = new Low(file);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home route - Entry ID and DOB input
app.get("/", (req, res) => {
  res.render("index");
});

// Check Entry POST - validates entry and payment
app.post("/check-entry", async (req, res) => {
  const { entryID, dob } = req.body;
  await db.read();

  const entry = db.data.entries.find(
    (e) => e.EntryID === entryID && e.DOB === dob
  );
  const venueOptions = db.data.venueOptions;

  if (entry && entry.PaymentStatus === "Paid") {
    res.render("details", { entry, venueOptions });
  } else {
    res.render("error");
  }
});

// Update Entry POST - saves city, venue, date if not already changed
app.post("/update-entry", async (req, res) => {
  const { entryID, venueCity, venue, dates } = req.body;
  await db.read();

  const entry = db.data.entries.find((e) => e.EntryID === entryID);

  if (entry) {
    if (entry.ChangedDates === 0) {
      entry.VenueCitySelected = venueCity;
      entry.VenueSelected = venue;
      entry.DatesForTrial = dates;
      entry.ChangedDates = 1;
      await db.write();
      res.render("success", { name: entry.Name });
    } else {
      res.send(
        "You have already changed your details once. Further changes are not allowed."
      );
    }
  } else {
    res.send("Entry not found.");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

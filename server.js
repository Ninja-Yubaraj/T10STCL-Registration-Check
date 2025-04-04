const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Low, JSONFile } = require("lowdb");

const app = express();
const port = 3000;

const file = new JSONFile("db.json");
const db = new Low(file);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post('/check-entry', async (req, res) => {
  const { entryID, dob } = req.body;

  await db.read();

  const entry = db.data.entries.find(e => e.EntryID === entryID && e.DOB === dob);
  const venueOptions = db.data.venueOptions; // ✅ load the venueOptions array

  if (entry && entry.PaymentStatus === 'Paid') {
    res.render('details', { entry, venueOptions });
  } else {
    res.render('error');
  }  
});

app.post('/update-entry', async (req, res) => {
  const { entryID, venue, dates } = req.body;
  await db.read();
  const entry = db.data.entries.find(e => e.EntryID === entryID);

  if (entry) {
    if (entry.ChangedDates === 0) {
      entry.VenueSelected = venue;
      entry.DatesForTrial = dates;
      entry.ChangedDates = 1;
      await db.write();
      res.render('success', { name: entry.Name });
    } else {
      res.send('You have already changed your details once. Further changes are not allowed.');
    }
  } else {
    res.send('Entry not found.');
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

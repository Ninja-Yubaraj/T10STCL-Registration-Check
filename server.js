require("dotenv").config(); // Load environment variables

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Low, JSONFile } = require("lowdb");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// LowDB setup
const file = new JSONFile("db.json");
const db = new Low(file);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

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

      // Send confirmation email
      const mailOptions = {
        from: `"T10 STCL Trials" <${process.env.SMTP_USER}>`,
        to: entry.Email,
        subject: "Trial Venue & Date Confirmation",
        html: `
          <p>Dear ${entry.Name},</p>
          <p>Thank you for confirming your trial preferences.</p>
          <p>
            <strong>City:</strong> ${venueCity}<br>
            <strong>Venue:</strong> ${venue}<br>
            <strong>Date:</strong> ${dates}
          </p>
          <p>Please arrive 30 minutes early with your ID and gear.</p>
          <br>
          <p>Best regards,<br>The T10 STCL Team</p>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent to", entry.Email);
      } catch (err) {
        console.error("Failed to send confirmation email:", err);
      }

      res.render("success", { name: entry.Name });
    } else {
      res.send("You have already changed your details once. Further changes are not allowed.");
    }
  } else {
    res.send("Entry not found.");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

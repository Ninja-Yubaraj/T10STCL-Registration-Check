# 🎫 T10STCL Registration Check

A clean, minimal, and beautifully styled web app built with **Node.js**, **Express**, and **EJS** to verify entry information and collect trial preferences. Includes frosted glass UI, dropdown selection, data validation, and user access control.

---

## 🚀 Features

✅ Simple form to verify **Entry ID** + **Date of Birth**  
✅ Displays user information if **Payment is completed**  
✅ Dropdowns for **Venue selection** and **Trial dates**  
✅ Automatically locks updates after the first submission  
✅ Beautiful **frosted glass UI** with animations  
✅ Custom **favicon** and logo branding  
✅ Fully responsive & mobile-friendly  
✅ Built with **LowDB** for simplicity (JSON-based storage)

---

## 🧱 Tech Stack

- **Node.js + Express** – Backend server
- **EJS** – Templating engine
- **LowDB** – Lightweight JSON database
- **HTML/CSS** – Custom styled (no framework)
- **Font Awesome** – Icons
- **Hosted logo** – Embedded via external image

---

## 📸 Screenshots

### 🔹 Entry Check Page  
![Entry Check](https://i.imgur.com/UP4TLgx.png)

### 🔹 Trial Selection Page  
![Trial Selection](https://i.imgur.com/XIiCXjp.png)

### 🔹 Success Confirmation  
![Success](https://i.imgur.com/wT7YNyh.png)

### 🔹 Error / Not Found  
![Error](https://i.imgur.com/OMBPAZf.png)

### 🔹 Already Exists
![Already Exists](https://i.imgur.com/EpKTFF7.png)

---

## 📁 Folder Structure

```
entry-checker/
├── node_modules
├── public/
│   └── styles.css
├── views/
│   ├── index.ejs
│   ├── details.ejs
│   ├── success.ejs
│   └── error.ejs
├── .gitignore
├── db.json
├── db.json.example
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🛠️ Installation

```bash
git clone https://github.com/yourusername/entry-checker.git
cd entry-checker
npm install
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Customization

- Modify `db.json` to manage your entries and venue/date options.
- Logo and favicon can be updated in `/views/*.ejs`.

---

## 💛 Author

Made with care by [Yubaraj Sarkar](https://github.com/Ninja-Yubaraj)  

---
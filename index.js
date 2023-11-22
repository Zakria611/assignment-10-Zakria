
const express = require("express");
const multer = require("multer");
const app = express();
const port = 3000;
const path = require("path");

// Set up Multer storage and file naming
const storage = multer.diskStorage({
  destination: "./uploads", // Make sure this path exists
  filename: function (req, file, cb) {
    const customFilename = req.body.filename || Date.now(); // Use custom filename if provided, else use timestamp
    const extension = path.extname(file.originalname);
    cb(null, customFilename + extension);
  },
});

const upload = multer({ storage: storage });

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define a route for file upload
app.post("/upload", upload.single("file"), (req, res) => {
  // Provide a link to the uploaded file
  const fileLink =
    req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
  res.send(`File uploaded! Access it here: ${fileLink}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

require('dotenv').config();
const express = require("express");
const multer = require('multer');
const cors = require('cors');
const fs = require("fs");
const path = require("path");
const router = require('./routers/data-ai');


const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use("/data-ai" , router);

const uploadDir = './uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
    return cb(null, `${Date.now()}-${safeName}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'text/csv' ||
    file.mimetype === 'application/vnd.ms-excel'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter , limits: {
    fileSize: 5 * 1024 * 1024
  }});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/data", upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded or invalid file type");
  }

  const filePath = path.join(uploadDir, req.file.filename);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the uploaded file");
    }

    const lines = data.trim().split('\n');

    const returnData = lines
      .filter(line => line.includes(','))
      .map((cur, index) => {
        const [deadline, task] = cur.trim().split(',');
        return {
          id: index,
          deadline: deadline.trim(),
          task: task.trim(),
          notes: "",
          links: []
        };
      });

    res.status(200).json(returnData);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

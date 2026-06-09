const express = require("express");
const uploadfile = require("../middlewares/s3bucket");

const multer = require("multer");
const authController = require("../controllers/vendors/authController");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
router.post("/upload/file", upload.single("image"), async (req, res) => {
  try {
    let url = await uploadfile(req);
    res.status(200).send({ url: url });
  } catch (error) {
    console.error("Upload route error:", error.message);
    res.status(400).send({ error: error.message || "Upload failed" });
  }
});

module.exports = router;

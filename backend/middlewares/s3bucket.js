const { v1: uuidv1 } = require("uuid");
const path = require("path");
const fs = require("fs");

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const uploadfile = async (req) => {
  try {
    const file = req.file;
    if (!file) {
      throw new Error("No file provided");
    }

    const ext = path.extname(file.originalname) || ".jpg";
    const fileKey = uuidv1() + ext;
    const filePath = path.join(uploadsDir, fileKey);

    // Save file locally
    fs.writeFileSync(filePath, file.buffer);

    // Return URL that can be accessed via express static
    const protocol = req.protocol;
    const host = req.get("host");
    const imageUrl = `${protocol}://${host}/uploads/${fileKey}`;

    console.log("File uploaded locally:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Error uploading image");
  }
};

// Helper: delete local file
const deleteImage = async (fileKey) => {
  try {
    const filePath = path.join(uploadsDir, fileKey);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File ${fileKey} deleted successfully`);
    }
  } catch (error) {
    console.error("Delete error:", error);
  }
};

module.exports = uploadfile;

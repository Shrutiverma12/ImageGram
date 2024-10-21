import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();
const multerUploads = multer({
  storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(
        new Error("Unsupported file type Only jpg, png and jpeg is supported!")
      );
      return;
    }
    cb(null, true);
  },
}).single("image");

export { multerUploads };

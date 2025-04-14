import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Helper to ensure upload folders exist
const createUploadFolder = (folderName: string) => {
  const dir = path.join(__dirname, '..', 'images', folderName);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = file.fieldname === 'profilePic' ? 'users' : 'products';
    const dir = createUploadFolder(folder);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage });

export default upload;

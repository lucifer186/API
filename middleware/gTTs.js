
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const videoFilter = function(req, file, cb) {
  // Accept videos only
  if (!file.originalname.match(/\.(mp4)$/)) {
      req.fileValidationError = 'Only video files are allowed!';
      return cb(new Error('Only video files are allowed!'), false);
  }
  cb(null, true);
};

var upload = multer({storage:storage,fileFilter:videoFilter}).single('file')

// let uploadFileMiddleware = util.promisify(upload);

module.exports = upload;
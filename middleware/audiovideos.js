// const util = require('util')
const multer = require('multer')
const maxSize = 20 * 1024 * 1024;
var storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null,   __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); //Appending extension
  },
});
 
var upload = multer({ storage: storage })
// let uploadFileMiddleware = util.promisify(upload);
module.exports = upload;
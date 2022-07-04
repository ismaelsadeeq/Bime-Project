const multer  = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  
  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const storageFile = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, '');
  },

  // By default, multer removes files extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
});

const storageAllMedia = multer.diskStorage({
  
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    const filename = `${new Date().getTime()}.${fileExt}`;
    cb(null, filename);
  },
});


const storageVideo = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    const filename = `${new Date().getTime()}.${fileExt}`;
    cb(null, filename);
  },
});

module.exports = {
  storage,
  storageFile,
  storageAllMedia,
  storageVideo
}
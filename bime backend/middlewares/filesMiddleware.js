const multer = require('multer');
const storage = require('../config/multerConfig');

const singleUpload = multer({
    storage: storage.storage,
    limits: {fileSize: 2048 * 2048 }
  }).single('profile_pic');

const singleFileUpload = multer({
    storage: storage.storageFile,
    limits: {fileSize: 10024 * 10024 }
}).single('file');

const singleAllMediaUpload = multer({
  storage: storage.storageAllMedia,
  limits: {
    fieldNameSize: 200,
    fileSize: 30 * 1024 * 1024,
  }
}).array("media",3);

const singleVideoUpload = multer({
  storage: storage.storageVideo,
  limits: {
    fieldNameSize: 200,
    fileSize: 30 * 1024 * 1024,
  }
}).array("video",2);

  module.exports = {
      singleUpload,
      singleFileUpload,
      singleAllMediaUpload,
      singleVideoUpload
     
  }
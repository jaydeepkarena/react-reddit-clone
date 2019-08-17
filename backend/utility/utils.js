const mongoose = require('mongoose');
const fs = require('fs');

const fileExists = path => {
  fs.access(path, fs.constants.F_OK, err => {
    return new Promise((res, rej) => {
      if (err) {
        rej(err);
      }
      res(true);
    });
  });
};

const defaultProfileName = 'default_profile_image.png';
const profileImage = `./assets/${defaultProfileName}`;
const defaultProfileImagePath = `../uploads/${defaultProfileName}`;

module.exports.setDefaultProfileImage = async () => {
  console.log(`fileExists(profileImage) : ${fileExists(profileImage)}`);
  if (!(await fileExists(profileImage))) {
    console.log(`Default profile image not found in assets!`);
    return;
  }
  if (fileExists(defaultProfileImagePath)) {
    console.log(`Default profile image available in uploads!`);
    return;
  }
  console.log(`copy...`);
};

module.exports.isValidMongoDbObjectId = id => mongoose.Types.ObjectId.isValid(id);

module.exports.defaultProfileImage = profileImage;

module.exports.fileExists = fileExists;

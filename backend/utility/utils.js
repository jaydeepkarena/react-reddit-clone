const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')

const profileImagePlaceholder = 'default_profile_image.png';
const defaultProfileImage = `./uploads/${profileImagePlaceholder}`;
const assetProfileImage = `./assets/${profileImagePlaceholder}`;

const fileExists = file => {
  return new Promise((resolve, reject) => {
    fs.access(file, fs.constants.F_OK, err => {
      if (err) {
        console.log(`FILE NOT FOUND: ${file}`);
        resolve(false);
      }
      resolve(true);
    });
  });
};

module.exports.setDefaultProfileImage = async () => {
  if (!(await fileExists(assetProfileImage))) {
    console.log(`Profile image not found in Assets!`);
    return;
  }

  if (await fileExists(defaultProfileImage)) {
    return;
  }

  fs.copyFile(assetProfileImage, defaultProfileImage, err => console.log(err));
};

module.exports.isValidMongoDbObjectId = id => mongoose.Types.ObjectId.isValid(id);
module.exports.defaultProfileImage = path.join('uploads', profileImagePlaceholder);
module.exports.fileExists = fileExists;

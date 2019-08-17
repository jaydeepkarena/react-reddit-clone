const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')

const avatarPlaceHolder = 'default_avatar.png';
const defaultAvatarImage = `./uploads/${avatarPlaceHolder}`;
const assetAvatar = `./assets/${avatarPlaceHolder}`;

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
  if (!(await fileExists(assetAvatar))) {
    console.log(`Default avatar not found in Assets!`);
    return;
  }

  if (await fileExists(defaultAvatarImage)) {
    return;
  }

  fs.copyFile(assetAvatar, defaultAvatarImage, err => console.log(err));
};

module.exports.isValidMongoDbObjectId = id => mongoose.Types.ObjectId.isValid(id);
module.exports.defaultAvatar = path.join('uploads', avatarPlaceHolder);
module.exports.fileExists = fileExists;

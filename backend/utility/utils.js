const mongoose = require('mongoose');

module.exports.isValidMongoDbObjectId = id => mongoose.Types.ObjectId.isValid(id);

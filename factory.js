const User = require("./models/user.model");
const Photo = require("./models/photo.model");
const Collection = require("./models/collection.model");
const { photoPopulate, collectionPopulate } = require("./utils/populate");

const perPage = process.env.PER_PAGE || 10;

module.exports.getPhotos = (author, page = 1) => {
  const query = {};

  if (author) query.author = author;

  return Photo.find(query)
    .sort({ _id: -1 })
    .limit(perPage)
    .skip((page - 1) * perPage)
    .populate(photoPopulate);
};

module.exports.getPhotoById = (id) => {
  return Photo.findById(id).populate(photoPopulate);
};

module.exports.getCollections = (author, page = 1) => {
  const query = {};

  if (author) query.author = author;

  return Collection.find(query)
    .sort({ _id: -1 })
    .limit(perPage)
    .skip((page - 1) * perPage)
    .populate(collectionPopulate);
};

module.exports.getCollectionById = (id) => {
  return Collection.findById(id).populate(collectionPopulate);
};

const Collection = require("../models/collection.model");
const catchAsync = require("../utils/catchAsync");
const factory = require("../factory");
const { collectionPopulate } = require("../utils/populate");

module.exports.getCollections = catchAsync(async (req, res, next) => {
  const { p: page = 1 } = req.query;

  const collections = await factory.getCollections();
  res.status(200).json({
    status: "success",
    data: {
      collections,
    },
  });
});

module.exports.getCollection = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const collection = await factory.getCollectionById(id);
  res.status(200).json({
    status: "success",
    data: {
      collection,
    },
  });
});

module.exports.createCollection = catchAsync(async (req, res, next) => {
  const { id, description, title } = req.params;

  const collection = await Collection.create({
    id,
    description,
    title,
  });

  res.status(201).json({
    status: "success",
    data: {
      collection,
    },
  });
});

module.exports.addPhoto = catchAsync(async (req, res, next) => {
  const { photoId, collectionId } = req.params;

  const collection = Collection.findByIdAndUpdate(collectionId, {
    $push: { photos: photoId },
  }).populate(collectionPopulate);

  res.status(200).json({
    status: "success",
    data: {
      collection,
    },
  });
});

module.exports.removePhoto = catchAsync(async (req, res, next) => {
  const { photoId, collectionId } = req.params;
  const collection = Collection.findByIdAndUpdate(collectionId, {
    $pull: {
      photos: { _id: photoId },
    },
  });
});

module.exports.deleteCollection = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const collection = await Collection.findByIdAndDelete({
    id,
  });

  res.status(200).json({
    status: "success",
    data: {
      collection,
    },
  });
});

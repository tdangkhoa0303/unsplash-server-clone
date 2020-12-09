[
  getCollections,
  getCollection,
  createCollection,
  deleteCollection,
  addPhoto,
  deletePhoto,
];

const Collection = require("../models/collection.model");
const catchAsync = require("../utils/catchAsync");
const factory = require("../factory");

module.exports.getCollections = catchAsync(async (req, res, next) => {
  const { p: page = 1 } = req.query;

  const collections = await factory.getCollections();
  res.status(200).json({
    status: "succes",
    data: {
      collections,
    },
  });
});

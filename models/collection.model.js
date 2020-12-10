const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },

  cover: {
    type: mongoose.Types.ObjectId,
    ref: "Photo",
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  photos: [{ type: mongoose.Types.ObjectId, ref: "Photo" }],
});

const Collection = mongoose.model(
  "Collection",
  collectionSchema,
  "collections"
);

module.exports = Collection;

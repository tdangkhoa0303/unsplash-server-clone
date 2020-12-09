const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      trim: true,
    },

    tag: { type: String, trim: true },

    alt_description: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],

    location: {
      type: Object,
    },

    media: {
      type: mongoose.Types.ObjectId,
      ref: "Media",
    },

    width: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Photo = mongoose.model("Photo", photoSchema, "photos");

module.exports = Photo;

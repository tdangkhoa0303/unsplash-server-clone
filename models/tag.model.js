const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      default: function () {
        return this.title.toLowerCase();
      },
    },

    preview_photos: {
      type: mongoose.Types.ObjectId,
      ref: "Photo",
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    status: {
      type: String,
      enum: ["open", "private"],
      default: "open",
    },

    cover: {
      type: mongoose.Types.ObjectId,
      ref: "Photo",
    },

    featured: {
      type: Boolean,
      required: true,
      default: false,
    },

    owners: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],

    contributors: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],

    total: {
      type: Number,
      required: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema, "tags");

module.exports = Tag;

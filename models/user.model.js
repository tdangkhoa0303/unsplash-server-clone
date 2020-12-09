const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (email) => {
          const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return emailPattern.test(email);
        },
        message: "Invalid email",
      },
    },

    userName: {
      type: String,
      required: true,
      trim: true,
    },

    igUsername: {
      type: String,

      trim: true,
    },

    bio: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      require: [true, "Password is requied."],
    },
    profile_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo",
      },
    ],
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;

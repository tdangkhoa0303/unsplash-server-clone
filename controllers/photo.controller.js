const Photo = require("../models/photo.model");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { uploadImage } = require("../utils/media.utils");
const factory = require("../factory");

module.exports.getPhotos = catchAsync(async (req, res, next) => {
  const { p: page = 1 } = req.query;

  const photos = await factory.getPhotos();
  res.status(200).json({
    status: "success",
    data: {
      photos,
    },
  });
});

module.exports.getPhoto = catchAsync(async (req, res, next) => {
  const { id } = req.query;

  const photo = await factory.getPhotoById(id);

  res.status(200).json({
    status: "success",
    data: {
      photo,
    },
  });
});

module.exports.createPhoto = catchAsync(async (req, res, next) => {
  try {
    const { description, tag, location, id, height, width } = req.body;
    const user = req.jwtDecoded.data;
    const path = req.file.path;

    const media = await uploadImage(path, `posts/${id}`);

    const fs = require("fs");
    fs.unlinkSync(path);

    let photo = await Photo.create({
      id: id,
      location,
      author: user._id,
      media: media._id,
      tag,
      height,
      width,
      description,
    });

    await User.findByIdAndUpdate(user._id, { $push: { photos: photo._id } });

    photo = await factory.getPhotoById(photo._id);

    res.status(201).json({
      status: "success",
      data: { photo },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports.reactPhoto = catchAsync(async (req, res, next) => {
  try {
    const { photo: photoId } = req.query;
    const user = req.jwtDecoded.data;

    const photo = await Photo.findById(photoId);

    if (!photo) return new AppError("Invalid request params", 400);

    // Check if user's liked this post yet
    let likes = photo.likes;
    const index = likes.findIndex((id) => id.toString() === user._id);
    if (index >= 0)
      likes = [...likes.slice(0, index), ...likes.slice(index + 1)];
    else {
      likes.push(user._id);

      // Add new notification to post's author
      if (user._id !== photo.author.toString()) {
        // Push notification to uset
        const data = {
          to: post.author,
          author: user._id,
          action: "liked your photo.",
          path: post._id,
        };

        // pushNotification(io, data);
      }
    }

    await Photo.findByIdAndUpdate(photoId, {
      likes,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports.deletePhoto = catchAsync(async (res, req, next) => {
  const { photo: photoId } = req.body;
  const user = req.jwtDecoded.data;

  const photo = await Photo.findById(photo);

  if (!photo) return new AppError("Invalid request params", 400);

  if (photo.author !== user._id)
    return new AppError("Unauthorized action", 403);

  const deletedPhoto = await Photo.findByIdAndDelete(photoId);

  res.status(200).json({
    status: "success",
    data: {
      photo: deletedPhoto,
    },
  });
});

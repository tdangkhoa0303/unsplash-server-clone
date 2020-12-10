const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const { uploadImage } = require("../utils/media.utils");

module.exports.postAvatar = catchAsync(async (req, res, next) => {
  try {
    const user = req.jwtDecoded.data;
    const path = req.file.path;

    const media = await uploadImage(path, `Avatar/${user.userName}`);

    const fs = require("fs");
    fs.unlinkSync(path);

    const dds = await User.findOne({ _id: user._id }).updateOne({
      avatar: media._id,
    });

    console.log(dds);

    res.json({ success: true, data: { avatar: { url: media.url } } });
  } catch (err) {
    console.log(err);
  }
});

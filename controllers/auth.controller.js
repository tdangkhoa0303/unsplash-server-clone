const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Token = require("../models/token.model");

const { uploadImage, deleteImage } = require("../utils/media.utils");
const catchAsync = require("../utils/catchAsync");
const { generateToken, verifyToken } = require("../utils/auth.utils");
const { basicDetails } = require("../utils/user.utils");
const AppError = require("../utils/AppError");

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

module.exports.signUp = catchAsync(async (req, res, next) => {
  let { email, lastName, firstName, password, userName } = req.body;
  const saltRounds = 10;

  password = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    email,
    lastName,
    firstName,
    password,
    userName,
  });

  res.status(201).json({
    status: "success",
    data: {
      user: basicDetails(user),
    },
  });
});

module.exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).populate({
    path: "avatar",
    select: "url",
  });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(
      new AppError(
        "The email address or password is incorrect. Please retry again.",
        403
      )
    );

  return setToken(res, user);
});

module.exports.refreshToken = catchAsync(async (req, res, next) => {
  let token = await Token.findOne({
    refreshToken: req.signedCookies.refreshToken,
  });

  if (token) {
    const { refreshToken } = token;
    const { data } = await verifyToken(refreshToken, refreshTokenSecret);

    await Token.findOneAndRemove({ refreshToken });
    return setToken(res, data);
  }
  return next(new AppError("No token provided.", 403));
});

const setToken = async (res, user) => {
  const accessToken = await generateToken(
    user,
    accessTokenSecret,
    accessTokenLife
  );

  const refreshToken = await generateToken(
    user,
    refreshTokenSecret,
    refreshTokenLife
  );

  await Token.create({ refreshToken, accessToken });

  const cookieOptions = {
    maxAge: process.env.REFRESH_TOKEN_LIFE,
    ...(Boolean(process.env.LOCAL) ? {} : { sameSite: "none", secure: true }),
  };

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    signed: true,
    httpOnly: true,
  });

  return res.status(200).json({
    status: "success",
    data: {
      user: {
        ...basicDetails(user),
        token: accessToken,
      },
      refreshTTL: process.env.REFRESH_TOKEN_LIFE,
    },
  });
};

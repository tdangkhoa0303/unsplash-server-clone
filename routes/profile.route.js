const router = require("express").Router();
const {
  getProfile,
  deletePhoto,
  createPhoto,
  reactPhoto,
  getPhoto,
} = require("../controllers/profile.controller");

const multer = require("../middlewares/multer.middleware");
const { isAuth } = require("../middlewares/auth.middleware");

router.get("/", getProfile);

router.post("/avatar", multer.single("avatar"), updateAvatar);

module.exports = router;

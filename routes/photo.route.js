const router = require("express").Router();
const {
  getPhotos,
  deletePhoto,
  createPhoto,
  reactPhoto,
  getPhoto,
} = require("../controllers/photo.controller");

const multer = require("../middlewares/multer.middleware");
const { isAuth } = require("../middlewares/auth.middleware");

router.get("/", getPhotos);

router.get("/single", getPhoto);

router.post("/", isAuth, multer.single("photo"), createPhoto);

router.get("/react", isAuth, reactPhoto);

router.patch("/:id", isAuth, deletePhoto);

module.exports = router;

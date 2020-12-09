const router = require("express").Router();
const {
  getCollections,
  getCollection,
  createCollection,
  deleteCollection,
  addPhoto,
  deletePhoto,
} = require("../controllers/photo.controller");

const multer = require("../middlewares/multer.middleware");

router.get("/", getCollections);

router.get("/single", getCollection);

router.post("/", multer.single("cover"), createCollection);

router.post("/add", addPhoto);

router.post("/delete", deletePhoto);

router.patch("/:id", deleteCollection);

module.exports = router;

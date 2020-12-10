const router = require("express").Router();
const {
  getCollections,
  getCollection,
  createCollection,
  deleteCollection,
  addPhoto,
  removePhoto,
} = require("../controllers/collection.controller");

router.get("/", getCollections);

router.get("/single", getCollection);

router.post("/", createCollection);

router.post("/add", addPhoto);

router.post("/remove", removePhoto);

router.patch("/:id", deleteCollection);

module.exports = router;

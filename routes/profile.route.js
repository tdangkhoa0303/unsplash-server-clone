const router = require("express").Router();
const { postAvatar } = require("../controllers/profile.controller");

const multer = require("../middlewares/multer.middleware");

router.post("/avatar", multer.single("avatar"), postAvatar);

module.exports = router;

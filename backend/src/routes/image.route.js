const express = require("express");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.resolve(__dirname, "../../uploads/") });

const { create } = require("../controllers/image.controller");
const validateSecretKey = require("../middlewares/validateSecretKey");

const router = express.Router();

router.post("/", validateSecretKey, upload.single("image"), create);

module.exports = router;

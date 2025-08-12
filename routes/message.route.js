const express = require("express");
const protectRouter = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");
const {
  getUsersForSidebar,
  getMessage,
  sendMessage,
} = require("../controllers/message.controller");

const router = express.Router();

router.get("/users", protectRouter, getUsersForSidebar);
router.get("/:id", protectRouter, getMessage);

// router.post("/send/:id", protectRouter, sendMessage);
router.post("/send/:id", protectRouter, upload.single("image"), sendMessage);

module.exports = router;

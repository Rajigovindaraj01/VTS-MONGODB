const express = require("express");
const { createBlog, getBlogs } = require("../controllers/blogController");

const router = express.Router();

router.post("/blogs", createBlog);
router.get("/blogs", getBlogs);

module.exports = router;

var express = require('express');
var router = express.Router();
const { Comments, User, Posts } = require("../models");

router.post('/',async (req, res, next) => {
  const { commentContent, userID, postID } = req.body;
  const comment = await Comments.create({commentContent: commentContent, userID: userID, postID: postID})
  res.json(comment)
});



module.exports = router;
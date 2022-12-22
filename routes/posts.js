var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const { Posts, User, Comments } = require("../models");

router.post("/", async function (req, res, next)  {
  const { title, postContent, userID, token } = req.body;
  const post = await Posts.create({ title: title, postContent: postContent, userID: userID});
  res.json(post);
});

router.get("/", async function(req,res,next){
  const posts = await Posts.findAll(
    { include: [{

      model: User, 
      attributes: ["firstName", "lastName"], 
    }, {

      model: Comments, 
      attributes: ["commentContent","postID", "userID"], 
      include: [{
        model: User, 
        attributes: ["firstName", "lastName"], 
      }]
      
    }],

      order: [["createdAt", "DESC"]]
    });
    const comments = await Comments.findAll({
      include: [{
        model: User,
        attributes: ["firstName","lastName"]
      }]
    })
    res.json(posts) 
})

module.exports = router;
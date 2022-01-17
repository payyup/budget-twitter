const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

router.get("/getAll", async (req, res) => {
  Post.find({}).sort({ posted: 1 }).exec((err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

router.get("/get/:authorID", async (req, res) => {
  Post.find({ authorID: req.params.authorID }).sort({ posted: 1 }).exec((err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

router.post("/create", async (req, res) => {
  const { author, authorID, text } = req.body;
  const post = new Post({ author: author, authorID: authorID, text: text });
  post
    .save()
    .then(res.json("Posted successfully"))
    .catch(err => res.json(err));
});

router.post("/edit/:id", (req, res) => {
  const text = req.body.text;
  Post.findById(req.params.id).exec(async (err, post) => {
    post.text = text;
    post.save()
      .then(res.json("Posted updated"))
      .catch(err => res.json(err));
  });
});

router.delete('/delete/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id).exec(async (err, post) => {
    if (err) throw err;
    res.json("Post deleted");
  });
});

module.exports = router;
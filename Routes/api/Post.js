const express = require('express');

const router = express.Router();
const User = require('../../Modal/User');
const Profile = require('../../Modal/Profile');
const Post = require('../../Modal/Post');

const auth = require('../../Middleware/auth');

const { check, validationResult } = require('express-validator');

//@route  Post api/post
//@desc Create Post ROute
//access Private
router.post(
  '/',
  [auth, [check('text', 'Text is Required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

//@route  Get api/post
//@desc Get All Post
//access Private

router.get('/', auth, async (req, res) => {
  try {
    const post = await Post.find().sort({
      // sort({date:-1}) to get latest post
      date: -1,
    });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

//@route  Get api/post/:id
//@desc Get All Post by id
//access Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        msg: 'post not found',
      });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'post not found',
      });
    }
    res.status(500).send('server error');
  }
});

//@route Delete api/post
//@desc Delete Podst
//access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check On user

    if (!post) {
      return res.status(404).json({
        msg: 'post not found',
      });
    }
    //Check post user and logged in user is same or not
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'User Not Authorized',
      });
    }
    await post.remove();

    res.json({
      msg: 'Post Removed',
    });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'post not found',
      });
    }
    res.status(500).send('server error');
  }
});

//@route  Put api/post/likes/:id
//@desc Like Post
//@access Private

router.put('/likes/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check If Post has Already been Liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({
        msg: 'Post Already liked',
      });
    }

    post.likes.unshift({
      user: req.user.id,
    });

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

//@route  Put api/post/likes/:id
//@desc Like Post
//access Private

router.put('/unlikes/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check If Post Already Liked\
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({
        msg: 'Post Has not yet been like',
      });
    }

    //Get Remove index

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

//@route  Post api/post/comment/:id
//@desc Comment on a Post
//access Private
router.post(
  '/comments/:id',
  [auth, [check('text', 'Text is Required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

//@route  Delete api/post/comment/:id/:comment_id
//@desc Delete Comment on a Post
//access Private

router.delete('/comments/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Pull out comment

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Make comment exits
    if (!comment) {
      return res.status(404).json({
        msg: 'Comment does not exits',
      });
    }

    //Check User

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'User not authorized',
      });
    }

    //Get Remove index

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;

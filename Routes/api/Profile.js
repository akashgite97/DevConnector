const express = require('express');

const router = express.Router();

const auth = require('../../Middleware/auth');

const Profile = require('../../Modal/Profile');
const Post = require('../../Modal/Post');

const request = require('request');
const config = require('config');

const { check, validationResult } = require('express-validator');

const { response } = require('express');

//@route  GET api/profile/me
//@desc Get current user profile
//access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({
        msg: 'There is no profile for user',
      });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route  Post api/profile/me
//@desc Create or update profile
//access Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'status require').not().isEmpty(),
      check('skills', 'Skill Is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubname,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id; //Get all fields for user
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubname) profileFields.githubname = githubname;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //u=Build Social Object

    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({
        user: req.user.id,
      });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          {
            user: req.user.id,
          },
          {
            $set: profileFields,
          },
          {
            new: true,
          },
          {
            useFindandModify: true,
          }
        );
        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(400).send('server Error');
    }
  }
);

//@route  get api/profile
//@desc Get all profile
//access Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

//@route  get api/profile/:user_id
//@descG get pofile  by userid
//access Public

router.get('/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({
        msg: 'There is no profile for this user',
      });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      //Check if object type error
      return res.status(400).json({
        msg: ' Profile Not Found',
      });
    }
    res.status(500).send('server error');
  }
});

//@route  Delete api/profile
//@descG et  Delete all profile  user and post
//access Private

router.delete('/', auth, async (req, res) => {
  try {
    //  Remover user post

    await Post.deleteMany({ user: req.user.id });

    //Remove profile
    await Profile.findOneAndRemove({
      user: req.user.id,
    });

    //Remove User
    await User.findOneAndRemove({
      _id: req.user.id,
    });

    res.json({
      msg: 'User Deleted',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

//@route  PUt api/profile/experience
//@descG Add Profile Exprence
//access Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title Is reuired').not().isEmpty(),
      check('company', 'Compmany Is reuired').not().isEmpty(),
      check('from ', 'From date Is reuired').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { title, company, location, from, to, current, decription } =
      req.body;

    const newEx = {
      title,
      company,
      location,
      from,
      to,
      current,
      decription,
    };

    try {
      //Find user to add experiance
      var profile = await Profile.findOne({
        user: req.user.id,
      });

      //Update Experience
      /*  if (profile.experience) {
        profile.experience = Profile.findOneAndUpdate(
          { user: req.user.id },
          {
            $set: newEx,
          },
          {
            new: true,
          }
        );

        return re.json(profile);
      } */

      profile.experience.unshift(newEx);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server Error');
    }
  }
);

//@route  update api/profile/experiance/:exp-id
//@descG Update Profile Exprence
//access Private

//@route  Delete api/profile/experiance /:exp-id
//@descG Delete Profile Exprence
//access Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    //Get Remove Index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

//@route  PUt api/profile/Education
//@descG Add Profile Education
//access Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School Is reuired').not().isEmpty(),
      check('degree', 'Degree Is reuired').not().isEmpty(),
      check('fieldofstudy', 'FieldofStudy Is reuired').not().isEmpty(),
      check('from ', 'From date Is reuired').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { school, degree, fieldofstudy, from, to, current, decription } =
      req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      decription,
    };

    try {
      var profile = await Profile.findOne({
        user: req.user.id,
      });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server Error');
    }
  }
);

//@route  Delete api/profile/experiance /:edu-id
//@descG Delete Profile EDucation
//access Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    //Get Remove Index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

//@route  Get api/profile/g  ithub/username
//@desc GGet user REPO
//access Public

router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&
            sort=created:asc&client_id=${config.get(
              'githubClienId'
            )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: {
        'user-agent': 'node.js',
      },
    };
    request(options, (error, respnse, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(400).json({
          msg: 'No github profile found',
        });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

module.exports = router;

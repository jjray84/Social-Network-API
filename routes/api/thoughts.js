const router = require('express').Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');

router.get('/', (req, res) => {
  Thought.find({})
    .populate('reactions')
    .select('-__v')
    .then(dbThoughtData => {
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Thought.find({})
    .populate('reactions')
    .select('-__v')
    .then(dbThoughtData => {
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  const { thoughtText, username } = req.body;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const thought = new Thought({ thoughtText, username });

      return thought.save();
    })
    .then(dbThoughtData => {
      return User.findOneAndUpdate(
        { username },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Thought.findOneAndUpdate({ _id: req.params.id }, {$set: req.body}, {runValidators: true, new: true})
  .then((thoughts) => {
      return res.json(thoughts);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

module.exports = router;
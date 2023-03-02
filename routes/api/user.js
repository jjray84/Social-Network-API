const router = require('express').Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');

router.get('/', (req, res) => {
  User.find({})
    .populate('thoughts')
    .populate('friends')
    .select('-__v')
    .then(dbUserData => {
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/api/users', (req, res) => {
  const { username, email } = req.body;
  const user = new User({ username, email });

  user.save()
    .then(dbUserData => {
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
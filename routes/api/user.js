const router = require('express').Router();
const Thought = require('../../models');
const { User } = require('../../models');

router.get('/', (req, res) => {
  User.find()
    .select('-__v')
    .then(dbUser => {
      return res.json(dbUser);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id }).select('-__v').populate('thoughts').populate('friends')
  .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  const { username, email } = req.body;
  const user = new User({ username, email });

  user.save()
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, {$set: req.body}, {runValidators: true, new: true})
  .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

module.exports = router;
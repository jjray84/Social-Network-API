const Thought = require('./models/Thought');

app.get('/api/thoughts', (req, res) => {
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

app.post('/api/thoughts', (req, res) => {
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

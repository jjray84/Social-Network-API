const User = require('./models/User');

app.get('/api/users', (req, res) => {
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

app.post('/api/users', (req, res) => {
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

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
},
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please enter a valid email address']
    },
    thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    toJSON: {
      virtuals: true,
    },

});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
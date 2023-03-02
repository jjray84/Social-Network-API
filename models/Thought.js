const mongoose = require('mongoose');
  
  const reactionSchema = new mongoose.Schema({
    reactionId: {
      type: mongoose.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      // virtuals: true,
      getters: true
    }
  }
  );
  


  const thoughtSchema = new mongoose.Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);  

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});
  
  const Thought = mongoose.model('Thought', thoughtSchema);
  
  module.exports = Thought;
  
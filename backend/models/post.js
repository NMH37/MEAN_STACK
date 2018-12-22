const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Enter title!'],
    min: 3,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Enter content!'],
    min: 3,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  post_writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);

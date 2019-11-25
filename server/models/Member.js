const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const memberSchema = new Schema({
  name: String,
  age: Number,
  img: String,
  bio: String
}, {
  timestamps: { createdAt: 'createdDate',updatedAt: 'updatedDate' },
  toJSON: {
    transform: (doc, ret) => {
      delete doc._id;
      delete ret.__v;
      return ret;
    },
  }
});

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
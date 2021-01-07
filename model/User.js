const express = require('express');
const Mongoose = require('mongoose');
const usershcema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,

  },
  photo: {
    type: String,
    default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User'

    },

  }],
  pendingRequests: [{
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User'

    },
  }],
  EmailActiveCode: {
    type: String
  },
  codeExpireDate: {
    type: String
  },
  emailVerfied: {
    type: Boolean,
    default: false
  }




}, {
  timestamps: true
})
module.exports = Mongoose.model('User', usershcema);
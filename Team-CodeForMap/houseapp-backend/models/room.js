const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  frontImage: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  isResidential: {
    type: Boolean,
    required: false,
  },
  isCommercial: {
    type: Boolean,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  numRoomsForRent: {
    type: Number,
    required: true,
  },
  isHouse: {
    type: Boolean,
    required: false,
  },
  isRoom: {
    type: Boolean,
    required: false,
  },
  isPG: {
    type: Boolean,
    required: false,
  },
  contactDetails: {
    isOwner: {
      type: Boolean,
      required: false,
    },
    isBroker: {
      type: Boolean,
      required: false,
    },
  },
  phone: {
    type: Number,
    required: false,
  },
  roomDetails: {
    bedrooms: {
      type: Number,
      required: false,
    },
    bathrooms: {
      type: Number,
      required: false,
    },
    balconies: {
      type: Number,
      required: false,
    },
  },
});

module.exports = mongoose.model('Room', roomSchema);

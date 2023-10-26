const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AlertSchema = new Schema(
  {
    location_info: {
      lat: {
        type: Number
      },
      lon: {
        type: Number
      }
    },
    org_name: {
      type: String
    },
    radius: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

const Alert = mongoose.model(
  "Alert",
  AlertSchema
);

module.exports = Alert;
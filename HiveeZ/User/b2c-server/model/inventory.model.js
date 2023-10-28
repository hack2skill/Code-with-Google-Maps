const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chemicalInventorySchema = new Schema(
  {
    chemicalname: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    storehouse1: {
      type: String,
      required: true,
    },
    storehouse2: {
      type: String,
      required: true,
    },
    location_info: {
      lat: {
        type: Number,
      },
      lon: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ChemicalInventory = mongoose.model(
  "ChemicalInventory",
  chemicalInventorySchema
);

module.exports = ChemicalInventory;

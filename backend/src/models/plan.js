const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: String,
    price: Number,
    capacityInByte: Number,
    isDefault: Boolean,
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("Plan", schema);
module.exports = Plan;

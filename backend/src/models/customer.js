const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    secretKey: String,
    capacityInByte: {
      type: Number,
      default: 0,
    },
    maxCapacityInByte: Number,
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", schema);
module.exports = Customer;

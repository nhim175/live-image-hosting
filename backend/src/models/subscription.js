const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    plan: {
      type: "ObjectId",
      ref: "Plan",
    },
    customer: {
      type: "ObjectId",
      ref: "Customer",
    },
    subscribedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", schema);
module.exports = Subscription;

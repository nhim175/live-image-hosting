const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema(
  {
    url: String,
    fileName: String,
    size: Number,
    customer: {
      type: "ObjectId",
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", schema);
module.exports = Image;

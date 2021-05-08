const httpStatus = require("http-status");

const { createImage } = require("../services/image.service");

exports.create = async (req, res, next) => {
  try {
    const { customer, file } = req;
    const image = await createImage(customer, file);
    res.json(image);
  } catch (e) {
    console.error(e);
    if (e.name === "CANNOT_UPLOAD") {
      return res.status(httpStatus.BAD_REQUEST).send("Cannot upload");
    }
    next(e);
  }
};

const Customer = require("../models/customer");

module.exports = async (req, res, next) => {
  const secretKey = req.headers["secret-key"];
  const customer = await Customer.findOne({ secretKey });
  if (!customer) {
    return next(new Error("Wrong secret key"));
  }
  req.customer = customer;
  next();
};

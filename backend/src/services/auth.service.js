const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const Customer = require("../models/customer");
const Plan = require("../models/plan");
const Subscription = require("../models/subscription");

const generateSecretKey = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, function (err, buffer) {
      if (err) reject(err);
      const token = buffer.toString("hex");
      resolve(token);
    });
  });
};

exports.register = async ({ email, password }) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const plan = await Plan.findOne({ isDefault: true });
  const secretKey = await generateSecretKey();
  const customer = await Customer.create({
    email,
    password: passwordHash,
    secretKey,
    maxCapacityInByte: plan.capacityInByte,
  });
  await Subscription.create({ plan, customer, subscribedAt: new Date() });
  return customer;
};

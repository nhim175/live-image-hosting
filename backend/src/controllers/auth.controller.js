const AuthService = require("../services/auth.service");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = await AuthService.register({ email, password });
    res.json(customer);
  } catch (e) {
    next(e);
  }
};

const Joi = require('@hapi/joi');
const responses = require('../responses');

const schema = Joi.object().keys({
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/),

  email: Joi.string().email(),
});

const validator = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    // next();
    responses.success('ayam', res);
  } catch (err) {
    responses.error(String(err), res);
  }
};

module.exports = validator;

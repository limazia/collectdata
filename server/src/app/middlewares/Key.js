const { ConstantError } = require("../../app/constants");

class Key {
  async Authentication(request, response, next) {
    const authHeader = request.headers["key"];

    if (!authHeader) {
      return response.json({ error: ConstantError.API_KEY_MISSING });
    }

    try {
      if (authHeader === process.env.API_KEY) {      
        return next();
      }
    } catch (err) {
      return response.json({ error: ConstantError.INVALID_API_KEY });
    }
  }
}

module.exports = new Key();
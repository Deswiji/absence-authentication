const jwt = require('jsonwebtoken');
const {
  HttpUnAuthenticate,
  HttptokenExpired,
} = require('../HttpException/index');

async function main(req, res, next) {
  if (req.headers['x-access-token']) {
    const accessToken = req.headers['x-access-token'];
    await jwt.verify(accessToken, process.env.JWT_KEY_ACCESS, (err, result) => {
      if (err) {
        return HttptokenExpired(res, err);
      }
      req.auth = result;
      next();
    });
  } else {
    return HttpUnAuthenticate(res);
  }
}

module.exports = main;

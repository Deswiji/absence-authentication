const jwt = require('jsonwebtoken');

class Token {
  constructor(expiresIn) {
    this.expiresIn = expiresIn || '1h';
    this.payload = {};
  }

  setToken(payload) {
    this.payload = payload;
  }

  signToken() {
    return jwt.sign(
      {
        id: this.payload.id,
        email: this.payload.email,
      },
      process.env.JWT_KEY_ACCESS,
      { expiresIn: this.expiresIn },
    );
  }

  signRefreshToken(token) {
    return jwt.sign(
      {
        userID: this.payload.id,
        email: this.payload.email,
        id: token,
      },
      process.env.JWT_KEY_ACCESS_REFRESHTOKEN,
      { expiresIn: '8d' },
    );
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_KEY_ACCESS);
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_KEY_ACCESS_REFRESHTOKEN);
  }
}

module.exports = Token;

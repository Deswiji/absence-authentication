const { HttpInvalidCLientKey } = require('../HttpException');

function encodeClientAuth(authKey) {
  return Buffer.from(authKey, 'base64').toString('ascii');
}

async function isValidClientAuth(authKey) {
  const encodeKey = encodeClientAuth(authKey);
  if (encodeKey) {
    const keys = ['Hanya Manusia Biasa Yang Berusaha Meraih Mimpi'];
    return keys.find((key) => key === encodeKey);
  }
  return false;
}

async function midlewareClient(req, res, next) {
  if (req.headers.authorization) {
    const clientkey = req.headers.authorization;
    if (clientkey) {
      const isValidKey = await isValidClientAuth(clientkey);
      if (isValidKey) {
        next();
      } else {
        return HttpInvalidCLientKey(res);
      }
    }
  } else {
    return HttpInvalidCLientKey(res);
  }
}

module.exports = {
  midlewareClient,
};

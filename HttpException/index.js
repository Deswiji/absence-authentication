class HttpException {
  async HttpBadGateway(res) {
    return res.status(502).json({
      success: false,
      message: 'Bad gateway',
    });
  }

  async HttpBadRequest(res) {
    return res.status(400).json({
      success: false,
      message:
        'Bad Request. The server could not understand the request due to invalid syntax.',
    });
  }

  async HttpUnAuthorized(res) {
    return res.status(403).json({
      success: false,
      message:
        'UnAuthorized. The client does not have access rights to the content;',
    });
  }
  async HttptokenExpired(res, err) {
    return res.status(401).json({
      success: false,
      message: 'token Expire or Broken.',
      data: err,
    });
  }

  async HttpUnAuthenticate(res) {
    return res.status(401).json({
      success: false,
      message:
        'UnAuthenticate. the client must authenticate it self to get the requested response.',
    });
  }

  async HttpInvalidSignature(res) {
    return res.status(400).json({
      success: false,
      message:
        'Invalid Signature. the signature must valid in payload + hask key',
    });
  }

  async HttpInvalidCLientKey(res) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ClientKey.',
    });
  }

  async HttpNotFound(res, data) {
    return res.status(404).json({
      success: false,
      message: 'The server can not find the requested resource.',
      data: data ? data : '{}',
    });
  }

  async HttpinteralServerError(res, error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: error,
    });
  }

  async HttpSuccess(res, data) {
    return res.status(200).json({
      success: true,
      message: 'The request has succeeded',
      data: data,
      api_version: process.env.API_VERSION_NAME,
    });
  }

  async HttpSuccessCreate(res, data) {
    return res.status(201).json({
      success: true,
      message:
        'The request has succeeded and a new resource has been created as a result.',
      data: data,
    });
  }

  async HttpSuccessUpdate(res, data) {
    return res.status(201).json({
      success: true,
      message: 'The request has succeeded and a resource has been updated.',
      data: data,
    });
  }

  async HttpConflict(res, data) {
    return res.status(409).json({
      success: false,
      message:
        'This response is sent when a request conflicts with the current state of the server.',
      data: data,
    });
  }

  async HttpUnprocessable(res, data) {
    return res.status(422).json({
      success: false,
      message: 'Some attributes required',
      data: data,
    });
  }

  async HttpInvalid(res, message, data) {
    return res.status(422).json({
      success: false,
      message: message,
      data: data,
    });
  }
}

module.exports = new HttpException();

const { verifyJWT } = require('../utils/JWT');

// Middleware to verify the access token and authenticate the request.
function authMiddleware(req, res, next) {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({
      error: 'Session expired. Please log in again.'
    });
  }

  const payload = verifyJWT(token);

  if (!payload || payload.type === 'refresh') {
    return res.status(401).json({
      error: 'Invalid access token. Please re-authenticate.'
    });
  }

  if (!payload.id) {
    return res.status(401).json({ error: 'User identification failed' });
  }

  req.user = {
    id: payload.id,
    username: payload.username
  };

  next();
}

module.exports = authMiddleware;
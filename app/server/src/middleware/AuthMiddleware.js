const { verifyJWT } = require('../utils/JWT');

function authMiddleware(req, res, next) {
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ error: 'TOKEN_MISSING' });
  }

  const payload = verifyJWT(token);

  if (!payload || payload.type === 'refresh') {
    return res.status(401).json({
      error: 'TOKEN_EXPIRED',
      message: 'Access token is no longer valid'
    });
  }

  req.user = {
    id: payload.id,
    username: payload.username
  };

  next();
}

module.exports = authMiddleware;
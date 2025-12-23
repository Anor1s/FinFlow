const crypto = require('crypto');
const { SECRET } = require('../config/Constants');

function createJWT(payload, expiresIn) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  const now = Math.floor(Date.now() / 1000);

  const jwtPayload = {
    ...payload,
    iat: now,
    exp: now + expiresIn
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(jwtPayload)).toString('base64url');

  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function verifyJWT(token) {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.');

    const validSignature = crypto
      .createHmac('sha256', SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');

    if (signature !== validSignature) return null;

    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());

    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}

module.exports = { createJWT, verifyJWT };
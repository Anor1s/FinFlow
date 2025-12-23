const pool = require('../database/DataBase');
const argon2 = require('argon2');
const { createJWT } = require('../utils/JWT');
const { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } = require('../config/Constants');

// Configuration for HttpOnly cookies.
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
};

//Helper function to set authentication cookies in the response.
const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: ACCESS_TOKEN_EXPIRY * 1000
  });
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: REFRESH_TOKEN_EXPIRY * 1000
  });
};

// Handles user registration.
exports.register = async (req, res) => {
  try {
    const { username, email, password, repeatPassword } = req.body;

    if (!username || !email || !password || !repeatPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password !== repeatPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const userCheck = await pool.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    const hashedPassword = await argon2.hash(password);

    const newUserResult = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );
    const user = newUserResult.rows[0];

    const accessToken = createJWT({ id: user.id, username: user.username }, ACCESS_TOKEN_EXPIRY);
    const refreshToken = createJWT({ id: user.id, type: 'refresh' }, REFRESH_TOKEN_EXPIRY);

    const expiryMs = Number(REFRESH_TOKEN_EXPIRY) * 1000;
    const expiresAt = new Date(Date.now() + expiryMs);

    await pool.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, refreshToken, expiresAt]
    );

    setAuthCookies(res, accessToken, refreshToken);
    res.status(201).json({
      message: 'Registration successful',
      user: { username: user.username, email: user.email }
    });

  } catch (err) {
    console.error("REGISTRATION ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
};

// Handles user authentication.
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const userResult = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [identifier]
    );
    const user = userResult.rows[0];

    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({ error: 'User with this username does not exist' });
    }

    const isPasswordValid = await argon2.verify(user.password_hash, password);
    if (!isPasswordValid) {
      console.log('Password verification failed');
      return res.status(401).json({ error: 'Invalid password' });
    }

    console.log('Authentication successful for user:', user.username);

    const accessToken = createJWT({ id: user.id, username: user.username }, ACCESS_TOKEN_EXPIRY);
    const refreshToken = createJWT({ id: user.id, type: 'refresh' }, REFRESH_TOKEN_EXPIRY);

    try {
      const expiryMs = Number(REFRESH_TOKEN_EXPIRY) * 1000;
      const expiresAt = new Date(Date.now() + expiryMs);

      await pool.query(
        'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [user.id, refreshToken, expiresAt]
      );
      console.log('Refresh token saved to database');
    } catch (dbErr) {
      console.error('DATABASE INSERT ERROR:', dbErr.message);
      throw dbErr;
    }

    setAuthCookies(res, accessToken, refreshToken);
    res.json({
      message: 'Login successful',
      user: { username: user.username, email: user.email }
    });

  } catch (err) {
    console.error("CRITICAL LOGIN ERROR:", err);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};

// Handles user logout by removing the refresh token from the database and clearing cookies.
exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logout successful' });
  } catch (err) {
    console.error("LOGOUT ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error during logout' });
  }
};

// Deletes the user account and associated data.
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query('DELETE FROM users WHERE id = $1', [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Account permanently deleted' });
  } catch (err) {
    console.error("ACCOUNT DELETION ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error during account deletion' });
  }
};

// Returns the profile of the currently authenticated user.
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
      SELECT id, username, email, created_at, last_login 
      FROM users 
      WHERE id = $1
    `;

    const result = await pool.query(query, [userId]);


    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userProfile = result.rows[0];

    res.json({
      message: 'Profile data retrieved successfully',
      user: userProfile
    });

  } catch (err) {
    console.error("GET_PROFILE_ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error while fetching profile' });
  }
};
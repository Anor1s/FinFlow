const pool = require('../database/DataBase');
const argon2 = require('argon2');
const { createJWT, verifyJWT } = require('../utils/JWT');
const { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } = require('../config/Constants');

// Configuration for HttpOnly cookies.
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
};

const publicCookieOptions = {
  httpOnly: false, // JS must see it
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
  res.cookie('isLoggedIn', 'true', {
    ...publicCookieOptions,
    maxAge: REFRESH_TOKEN_EXPIRY * 1000
  });
};

exports.refresh = async (req, res) => {
  try {
    const oldRefreshToken = req.cookies?.refreshToken;

    if (!oldRefreshToken) {
      return res.status(401).json({ error: 'Refresh token missing' });
    }

    const payload = verifyJWT(oldRefreshToken);

    if (!payload || payload.type !== 'refresh') {
      return res.status(401).json({ error: 'Token expired or invalid' });
    }

    const tokenResult = await pool.query(
      'SELECT * FROM refresh_tokens WHERE token = $1 AND user_id = $2',
      [oldRefreshToken, payload.id]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(401).json({ error: 'Token not recognized' });
    }

    const dbToken = tokenResult.rows[0];

    if (new Date(dbToken.expires_at) < new Date()) {
      await pool.query('DELETE FROM refresh_tokens WHERE id = $1', [dbToken.id]);
      return res.status(401).json({ error: 'Token expired in DB' });
    }

    const userResult = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [payload.id]);
    const user = userResult.rows[0];


    const accessToken = createJWT({ id: user.id, username: user.username }, ACCESS_TOKEN_EXPIRY);
    const refreshToken = createJWT({ id: user.id, type: 'refresh' }, REFRESH_TOKEN_EXPIRY);


    await pool.query('DELETE FROM refresh_tokens WHERE id = $1', [dbToken.id]);
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY * 1000);

    await pool.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, refreshToken, expiresAt]
    );

    setAuthCookies(res, accessToken, refreshToken);
    res.json({ message: 'Tokens refreshed successfully' });

  } catch (err) {
    console.error("REFRESH ERROR:", err);
    res.status(500).json({ error: 'Internal server error during refresh' });
  }
};

// Handles user registration.
exports.register = async (req, res) => {
  try {
    const { username, email, password, repeatPassword } = req.body;

    // 1. Check if all fields are present
    if (!username || !email || !password || !repeatPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 2. Username validation (min 3 characters)
    if (username.trim().length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }

    // 3. Email validation (basic format: @ and . after it)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // 4. Password validation (min 8 characters)
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    // 5. Password match validation
    if (password !== repeatPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // 6. Check uniqueness (Username and Email)
    const checkQuery = `
      SELECT id FROM users WHERE username = $1
    `;
    const userCheck = await pool.query(checkQuery, [username.trim()]);

    if (userCheck.rows.length > 0) {
      // Logic to specify which field is taken
      const existingUser = userCheck.rows[0];
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const hashedPassword = await argon2.hash(password);

    const insertUserQuery = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3) 
      RETURNING id, username, email
    `;

    const newUserResult = await pool.query(insertUserQuery, [username.trim(), email.trim(), hashedPassword]);
    const user = newUserResult.rows[0];

    // JWT and Cookies logic remains the same
    const accessToken = createJWT({ id: user.id, username: user.username }, ACCESS_TOKEN_EXPIRY);
    const refreshToken = createJWT({ id: user.id, type: 'refresh' }, REFRESH_TOKEN_EXPIRY);

    const expiryMs = Number(REFRESH_TOKEN_EXPIRY) * 1000;
    const expiresAt = new Date(Date.now() + expiryMs);

    const insertTokenQuery = `
      INSERT INTO refresh_tokens (user_id, token, expires_at) 
      VALUES ($1, $2, $3)
    `;

    await pool.query(insertTokenQuery, [user.id, refreshToken, expiresAt]);

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

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Please provide both identifier and password' });
    }

    const cleanIdentifier = identifier.trim();

    const findUserQuery = `
      SELECT * FROM users WHERE username = $1 OR email = $1
    `;

    const userResult = await pool.query(findUserQuery, [cleanIdentifier]);
    const user = userResult.rows[0];

    // Security: Use a generic error message
    // Don't tell the attacker if the username exists or not
    if (!user) {
      console.log(`Login failed: User "${cleanIdentifier}" not found`);
      return res.status(401).json({ error: 'Invalid identifier or password' });
    }

    const isPasswordValid = await argon2.verify(user.password_hash, password);
    if (!isPasswordValid) {
      console.log(`Login failed: Wrong password for user "${user.username}"`);
      return res.status(401).json({ error: 'Invalid identifier or password' });
    }

    console.log('Authentication successful for user:', user.username);

    const accessToken = createJWT({ id: user.id, username: user.username }, ACCESS_TOKEN_EXPIRY);
    const refreshToken = createJWT({ id: user.id, type: 'refresh' }, REFRESH_TOKEN_EXPIRY);

    try {
      const expiryMs = Number(REFRESH_TOKEN_EXPIRY) * 1000;
      const expiresAt = new Date(Date.now() + expiryMs);

      const insertTokenQuery = `
        INSERT INTO refresh_tokens (user_id, token, expires_at) 
        VALUES ($1, $2, $3)
      `;

      await pool.query(insertTokenQuery, [user.id, refreshToken, expiresAt]);
      console.log('Refresh token saved to database');
    } catch (dbErr) {
      // If we can't save the token, we shouldn't log the user in
      console.error('DATABASE INSERT ERROR:', dbErr.message);
      return res.status(500).json({ error: 'Could not establish session' });
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
      const query = `
        DELETE FROM refresh_tokens WHERE token = $1
      `;

      await pool.query(query, [refreshToken]);
    }
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
    res.clearCookie('isLoggedIn', publicCookieOptions);
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

    const query = `
      DELETE FROM users WHERE id = $1
    `;

    const result = await pool.query(query, [userId]);

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
      SELECT id, username, email, created_at, last_login, base_currency 
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
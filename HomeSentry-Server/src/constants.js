let config
try {
    config = require('../config.json');
} catch (e) {}

export const JWT_SECRET = process.env.MongoSecret || config.secret
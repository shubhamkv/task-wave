const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    tls: false,
  },
  password: process.env.REDIS_PASSWORD,
});

const connectRedisServer = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Failed to connect to Redis", error);
    process.exit(1);
  }
};

module.exports = { connectRedisServer, redisClient };

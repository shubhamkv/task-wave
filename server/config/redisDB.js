const redis = require("redis");

const redisClient = redis.createClient();

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

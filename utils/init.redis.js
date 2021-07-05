import asyncRedis from 'async-redis';

const redisClient = asyncRedis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST
});

redisClient.on('connect', () => {
  console.log('Client connect to redis...');
});

redisClient.on('ready', () => {
  console.log('Client connect to redis and ready to use...');
});

redisClient.on('error', (err) => {
  console.log(err);
});

redisClient.on('end', () => {
  console.log('Client disconnect from redis.');
});

process.on('SIGIN', () => {
  redisClient.quit();
});

export default redisClient;

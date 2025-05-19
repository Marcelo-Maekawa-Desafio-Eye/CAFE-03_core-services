import { RedisClientType, createClient } from 'redis';

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT || '6379';
const redisUser = process.env.REDIS_USER || 'default';
const redisPassword = process.env.REDIS_PASSWORD;

export class RedisClient {
    private static instance: RedisClientType;

    private constructor() {}

    public static getInstance(): RedisClientType {
        if (!RedisClient.instance) {
            //const redisUrl = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
            //const redisUrl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
            const redisUrl = `redis://${redisUser}:${redisPassword}@${redisHost}:${redisPort}`;

            RedisClient.instance = createClient({
                url: redisUrl
            });

            RedisClient.instance.on('connect', () => {
                console.log(`Redis connected at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}.`);
            });

            RedisClient.instance.on('error', (err) => {
                console.error('Redis client Error:', err);
            });

            RedisClient.instance.connect().catch((err) => {
                console.error('Redis failed to connect:', err);
            });
        }

        return RedisClient.instance;

    }
}
import { createClient } from 'redis';

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT || '6379';

if (!redisHost) {
    throw new Error('[redis] Missing required Redis configuration.');
}

const redisUrl = `rediss://${redisHost}:${redisPort}`;

export const redisClient = createClient({
    url: redisUrl,
    socket: {
        host: redisHost,
        port: parseInt(redisPort),
        tls: true,
        rejectUnauthorized: false,
    },
});

redisClient.on('error', (err: unknown) => {
    if (err instanceof Error) {
        console.error('[redis] Connection error:', err.message);
    } else {
        console.error('[redis] Connection error: Unknown error occurred');
    }
});

export async function connectRedis() {
    try {
        await redisClient.connect();
        console.log('[redis] Connected to', redisUrl);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('[redis] Connection failed:', err.message);
        } else {
            console.error('[redis] Connection failed: Unknown error occurred');
        }
        throw new Error('Redis connection failed');
    }
}

import { DbConfig } from '../../config/dbConfig';
import { RedisClient } from '../../utils/redisClient';
import { Logger } from '../../utils/logger';
import { Product } from '../../interfaces/product.interface';

export const handler = async (): Promise<void> => {
    try {

        Logger.log('[redis] Starting update');

        const db = DbConfig.getInstance();
        const redis = RedisClient.getInstance();

        const [rows] = await db.query<Product[]>(`
            SELECT 
                id,
                name,
                description,
                price,
                image_url
            FROM
                products
            WHERE
                active = 1
        `);

        if (rows.length === 0) {
            Logger.log('[redis] ERROR query: No active products found');
            return;
        }

        await redis.set(
            'menu:active',
            JSON.stringify(rows)
        );

        Logger.log(`[redis] Updated menu: ${rows.length} active products`);

        for (const product of rows) {

            await redis.set(
                `product:${product.id}`,
                JSON.stringify(product)
            );

            Logger.log(`[redis] Updated product: ${product.name}`);
        }

        Logger.log('[redis] Update success');

    } catch (error) {
        
        Logger.error(`[redis] ERROR updating: ${error}`);
        throw new Error('Redis update failed');
    }
};

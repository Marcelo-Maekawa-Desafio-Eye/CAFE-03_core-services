import { DbConfig } from '../../config/dbConfig';
import { Logger } from '../../utils/logger';

export const handler = async (): Promise<void> => {
    try {
        const db = DbConfig.getInstance();

        const query = `
            INSERT INTO products (name, description, price, image_url) VALUES 
            ('Café Expresso', 'Café puro, forte e encorpado', 5.00, 'https://desafioeyecafe.972238418.xyz/products_imgs/expresso.jpg'),
            ('Cappuccino', 'Café com leite vaporizado e espuma', 7.50, 'https://desafioeyecafe.972238418.xyz/products_imgs/cappuccino.jpg'),
            ('Latte', 'Café com leite suave', 6.00, 'https://desafioeyecafe.972238418.xyz/products_imgs/latte.jpg'),
            ('Mocha', 'Café com chocolate e chantilly', 8.50, 'https://desafioeyecafe.972238418.xyz/products_imgs/mocha.jpg'),
            ('Chá Gelado', 'Bebida refrescante de chá', 4.00, 'https://desafioeyecafe.972238418.xyz/products_imgs/cha.jpg');
        `;

        await db.query(query);
        Logger.log('[lambda] Products inserted successfully');
    } catch (error) {
        Logger.error(`[lambda] Error inserting products: ${error}`);
        throw new Error('Database insert failed');
    }
};

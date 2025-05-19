import { DbConfig } from '../../config/dbConfig';
import { Logger } from '../../utils/logger';

const createTableQueries = [
    `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'saler', 'client') DEFAULT 'client',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) UNSIGNED NOT NULL,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        total_price DECIMAL(10,2) UNSIGNED,
        status ENUM('open', 'finished', 'canceled') DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );`,
    `CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        product_id INT,
        quantity INT,
        price DECIMAL(10,2) UNSIGNED,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );`,
    `CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT,
        amount DECIMAL(10,2) UNSIGNED,
        method ENUM('credit', 'pix', 'cash'),
        transaction_id VARCHAR(100) DEFAULT NULL,
        gateway_response TEXT,
        status ENUM('open', 'paid', 'fail') DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id)
    );`,
    `INSERT INTO products (name, description, price, image_url) VALUES 
        ('Café Expresso', 'Café puro, forte e encorpado', 5.00, 'https://desafioeyecafe.972238418.xyz/products_imgs/expresso.jpg'),
        ('Cappuccino', 'Café com leite vaporizado e espuma', 7.50, 'https://desafioeyecafe.972238418.xyz/products_imgs/cappuccino.jpg'),
        ('Latte', 'Café com leite suave', 6.00, 'https://desafioeyecafe.972238418.xyz/products_imgs/latte.jpg'),
        ('Mocha', 'Café com chocolate e chantilly', 8.50, 'https://desafioeyecafe.972238418.xyz/products_imgs/mocha.jpg'),
        ('Chá Gelado', 'Bebida refrescante de chá', 4.00, 'https://desafioeyecafe.972238418.xyz/products_imgs/cha.jpg')
        ON DUPLICATE KEY UPDATE name=VALUES(name);`
];

export const handler = async (): Promise<void> => {
    try {
        const db = DbConfig.getInstance();
        console.log("Conectando ao banco de dados...");

        for (const query of createTableQueries) {
            console.log(`Executando query: ${query}`);
            await db.query(query);
        }

        Logger.log('[lambda] Tables and products initialized successfully');
    } catch (error) {
        Logger.error(`[lambda] Error executing queries: ${error}`);
        throw new Error('Database initialization failed');
    }
};

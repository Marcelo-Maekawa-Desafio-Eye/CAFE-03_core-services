import { RowDataPacket } from 'mysql2';

export interface Product extends RowDataPacket {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}
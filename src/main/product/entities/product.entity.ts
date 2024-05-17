import { Document, Schema } from 'mongoose';

// Define the Product interface
export interface Product extends Document {
    id: string;
    product_name: string;
    product_image: string;
    product_isactive: boolean;
    product_price: number;
    product_category: Schema.Types.ObjectId;
    product_description: string;
    product_isdiscount: boolean;
}

// src/users/schemas/user.schema.ts

import * as mongoose from 'mongoose';


export const WalletSchema = new mongoose.Schema({
  wallet_balance: { type: String, required: true },
  wallet_user_id: { type: String, required: true, unique: true },
});

import { IToken } from './../types/token/IToken';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const tokenSchema = new Schema<IToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    refresh_token: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const TokenModel = model<IToken>('token_model', tokenSchema);

export default TokenModel;

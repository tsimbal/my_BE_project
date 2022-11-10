import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const tokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    refresh_token: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const TokenModel = model('token_model', tokenSchema);

export default TokenModel;

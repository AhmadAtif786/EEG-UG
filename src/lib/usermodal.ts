import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // ⚠️ plain password (not recommended for prod)
    name: { type: String },
  },
  { timestamps: true }
);

// Avoid model overwrite upon hot-reload in Next.js
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

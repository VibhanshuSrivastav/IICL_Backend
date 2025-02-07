// src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export enum UserRole {
  ADMIN = "admin",
  FRANCHISE = "franchise",
}

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  role: UserRole;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Example addition to your User Schema in models/User.ts
const UserSchema: Schema<IUser> = new Schema(
    {
      email: { type: String, required: true, unique: true },
      username: { type: String, unique: true, sparse: true }, // 'sparse' allows nulls if needed
      password: { type: String, required: true },
      role: {
        type: String,
        enum: Object.values(UserRole),
        required: true,
      },
    },
    { timestamps: true }
  );
  

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: unknown) {
    next(error as mongoose.CallbackError);
  }
});

// Method to compare passwords during login
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);

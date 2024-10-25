import mongoose from "mongoose";
import { UserRoles } from "../enums";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      required: true,
      default: UserRoles.USER,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create a unique partial index for 'phone' where the value is non-null
userSchema.index(
  { phone: 1 },
  { unique: true, partialFilterExpression: { phone: { $type: "string" } } }
);

export const Users = mongoose.model("users", userSchema);

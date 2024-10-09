import mongoose from "mongoose";
import { UserRoles } from "../enums";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    salt: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String, // Store the role as a string in MongoDB
      enum: Object.values(UserRoles), // Ensure it only accepts values from the UserRoles enum
      required: true,
      default: UserRoles.USER, // Set the default role
    },
    phone: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Users = mongoose.model("users", userSchema);

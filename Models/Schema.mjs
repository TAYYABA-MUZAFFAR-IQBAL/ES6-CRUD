import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: ["admin", "RegularUser", "guest"],
    default: "guest",
  },
});

export default mongoose.model("ES6User", userSchema);

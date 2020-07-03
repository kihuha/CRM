import { Schema, model } from "mongoose"

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["Admin", "SalesRepresentative"],
    },
  },
  { timestamps: true }
)

const userModel = model("User", UserSchema)

export default userModel

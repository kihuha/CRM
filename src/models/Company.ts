import { Schema, model } from "mongoose"

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const CompanyModel = model("Company", CompanySchema)

export default CompanyModel

import { Schema, model } from "mongoose"

const SalesRepSchema = new Schema(
  {
    name: String,
    personalPhone: String,
    workPhone: {
      type: String,
      required: true,
    },
    personalEmail: {
      type: String,
      required: true,
    },
    workEmail: String,
  },
  { timestamps: true }
)

const SalesRepModel = model("SalesRepresentative", SalesRepSchema)

export default SalesRepModel

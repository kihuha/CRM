import { Schema, model } from "mongoose"

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: String,
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    phoneAlt: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailAlt: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: [
        "created",
        "appointmentSet",
        "appointmentCompleted",
        "negotiating",
        "closedWon",
        "closedLost",
      ],
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    assignedRepresentative: {
      type: Schema.Types.ObjectId,
      ref: "SalesRepresentative",
    },
  },
  { timestamps: true }
)

const CustomerModel = model("Customer", CustomerSchema)

export default CustomerModel

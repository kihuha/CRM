import { Schema, model } from "mongoose"

const AppointmentsSchema = new Schema(
  {
    datetime: {
      type: Date,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    salesRepresentative: {
      type: Schema.Types.ObjectId,
      ref: "SalesRepresentative",
    },
  },
  { timestamps: true }
)

const AppointmentsModel = model("Appointment", AppointmentsSchema)

export default AppointmentsModel

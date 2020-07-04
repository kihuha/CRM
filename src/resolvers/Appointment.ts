import { CustomerModel, SalesRepresentativeModel } from "../models"

// TYPES
import { IAppointment } from "./types"

const Appointments = {
  customer: async (parent: IAppointment) => {
    const data = await CustomerModel.findById(parent.customer)

    return data
  },
  salesRepresentative: async (parent: IAppointment) => {
    const data = await SalesRepresentativeModel.findById(
      parent.salesRepresentative
    )

    return data
  },
}

export { Appointments as default }

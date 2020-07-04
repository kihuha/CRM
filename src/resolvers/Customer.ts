import CompanyModel from "../models/Company"
import SalesRepresentativeModel from "../models/SalesRepresentative"
import { ICustomer } from "./types"

const Customer = {
  company: async (parent: ICustomer) => {
    const data = await CompanyModel.findById(parent.company)

    return data
  },
  assignedRepresentative: async (parent: ICustomer) => {
    const data = await SalesRepresentativeModel.findById(
      parent.assignedRepresentative
    )

    return data
  },
}

export { Customer as default }

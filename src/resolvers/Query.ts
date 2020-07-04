// MODELS
import {
  AppointmentModel,
  CompanyModel,
  CustomerModel,
  SalesRepresentativeModel,
} from "../models"

const Query = {
  companies: async () => {
    try {
      const data = await CompanyModel.find({})

      return data
    } catch (e) {}
  },
  company: async (_: any, args: { id: String }) => {
    try {
      const data = await CompanyModel.findById({ _id: args.id })

      return data
    } catch (e) {}
  },
  customers: async () => {
    try {
      const data = await CustomerModel.find({})

      return data
    } catch (e) {}
  },
  customer: async (_: any, args: { id: String }) => {
    try {
      const data = await CustomerModel.findById({ _id: args.id })

      return data
    } catch (e) {}
  },
  salesRepresentatives: async () => {
    try {
      const data = await SalesRepresentativeModel.find({})

      return data
    } catch (e) {}
  },
  salesRepresentative: async (_: any, args: { id: String }) => {
    try {
      const data = await SalesRepresentativeModel.findById({ _id: args.id })

      return data
    } catch (e) {}
  },
  appointments: async () => {
    try {
      const data = await AppointmentModel.find({})
      // .populate({
      //   path: "customer",
      //   model: CustomerModel,
      //   populate: [
      //     {
      //       path: "company",
      //       model: CompanyModel,
      //     },
      //     {
      //       path: "assignedRepresentative",
      //       model: SalesRepresentativeModel,
      //     },
      //   ],
      // })
      // .populate({
      //   path: "salesRepresentative",
      //   model: SalesRepresentativeModel,
      // })

      return data
    } catch (e) {}
  },
  appointment: async (_: any, args: { id: String }) => {
    try {
      const data = await AppointmentModel.findById({ _id: args.id })
        .populate({
          path: "customer",
          model: CustomerModel,
          populate: [
            {
              path: "company",
              model: CompanyModel,
            },
            {
              path: "assignedRepresentative",
              model: SalesRepresentativeModel,
            },
          ],
        })
        .populate({
          path: "salesRepresentative",
          model: SalesRepresentativeModel,
        })

      return data
    } catch (e) {}
  },
}

export { Query as default }

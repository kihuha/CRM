import { ApolloError } from "apollo-server"

// MODELS
import {
  AppointmentModel,
  CompanyModel,
  CustomerModel,
  SalesRepresentativeModel,
  User,
} from "../models"

// TYPES
import {
  ICompany,
  ICustomer,
  IAppointment,
  ISalesRepresentative,
} from "./types"

const Mutation = {
  createCompany: async (_: any, args: ICompany) => {
    try {
      const newCompany = new CompanyModel({
        ...args,
      })

      await newCompany.save()

      return newCompany
    } catch (e) {
      return new ApolloError(e)
    }
  },
  updateCompany: async (_: any, args: ICompany) => {
    try {
      const updatedCompany = CompanyModel.findOneAndUpdate(
        { _id: args.id },
        {
          name: args.name,
          address: args.address,
        },
        { new: true }
      )

      return updatedCompany
    } catch (e) {}
  },
  deleteCompany: async (_: any, args: { id: String }) => {
    await CompanyModel.findOneAndDelete({ _id: args.id })

    return "Company deleted"
  },

  createCustomer: async (_: any, args: ICustomer) => {
    try {
      const newCustomer = new CustomerModel({ ...args })

      await newCustomer.save()

      return newCustomer
    } catch (e) {}
  },
  updateCustomer: async (_: any, args: ICustomer) => {
    try {
      const updatedCustomer = await CustomerModel.findOneAndUpdate(
        { _id: args.id },
        {
          name: args.name,
          address: args.address,
          phone: args.phone,
          phoneAlt: args.phoneAlt,
          email: args.email,
          emailAlt: args.emailAlt,
          company: args.company,
        },
        { new: true }
      )

      return updatedCustomer
    } catch (e) {}
  },
  deleteCustomer: async (_: any, args: { id: string }) => {
    await CustomerModel.findOneAndDelete({ _id: args.id })

    return "Customer deleted"
  },

  createSalesRepresentative: async (_: any, args: ISalesRepresentative) => {
    try {
      const newSalesRep = new SalesRepresentativeModel({ ...args })

      await newSalesRep.save()

      return newSalesRep
    } catch (e) {}
  },
  updateSalesRepresentative: async (_: any, args: ISalesRepresentative) => {
    try {
      const updateSalesRep = await SalesRepresentativeModel.findOneAndUpdate(
        {
          _id: args.id,
        },
        {
          name: args.name,
          personalPhone: args.personalPhone,
          workPhone: args.workPhone,
          personalEmail: args.personalEmail,
          workEmail: args.workEmail,
        },
        { new: true }
      )

      return updateSalesRep
    } catch (e) {}
  },
  deleteSalesRepresentative: async (_: any, args: { id: string }) => {
    try {
      await SalesRepresentativeModel.findOneAndDelete({ _id: args.id })

      return "Sales Representative deleted"
    } catch (e) {}
  },

  createAppointment: async (_: any, args: IAppointment) => {
    try {
      const newAppointment = new AppointmentModel({
        datetime: args.datetime,
        customer: args.customer,
        salesRepresentative: args.salesRepresentative,
      })
      await newAppointment.save()

      return newAppointment
    } catch (e) {}
  },
  updateAppointment: async (_: any, args: IAppointment) => {
    try {
      const updatedAppointment = AppointmentModel.findByIdAndUpdate(
        { _id: args.id },
        {
          datetime: args.datetime,
          customer: args.customer,
          salesRepresentative: args.salesRepresentative,
        },
        { new: true }
      )

      return updatedAppointment
    } catch (e) {}
  },
  cancelAppointment: async (_: any, args: { id: string }) => {
    try {
      await AppointmentModel.findOneAndDelete({ _id: args.id })

      return "Appointment deleted"
    } catch (e) {}
  },
}

export { Mutation as default }

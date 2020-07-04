import "./db"
import { ApolloServer, ApolloError } from "apollo-server"
import typeDefs from "./schema.graphql"

// MODELS
import {
  AppointmentModel,
  CompanyModel,
  CustomerModel,
  SalesRepresentativeModel,
  User,
} from "./models"

const port = process.env.PORT || 4000

interface ICompany {
  id?: string
  name: string
  address: string
}

interface ICustomer {
  id?: string
  name: string
  address: string
  phone: string
  phoneAlt: string
  email: string
  emailAlt: string
  company: string
  createdAt?: String
  updatedAt?: String
  status: [
    "created",
    "appointmentSet",
    "appointmentCompleted",
    "negotiating",
    "closedWon",
    "closedLost"
  ]
  assignedRepresentative: string
}

interface ISalesRepresentative {
  id?: string
  name: string
  personalPhone: string
  workPhone: string
  personalEmail: string
  workEmail: string
}

interface IAppointment {
  id?: string
  datetime: string
  customer: string
  salesRepresentative: string
}

const resolvers = {
  Query: {
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
          .populate("company")
          .populate("assignedRepresentative")

        return data
      } catch (e) {}
    },
    customer: async (_: any, args: { id: String }) => {
      try {
        const data = await CustomerModel.findById({ _id: args.id })
          .populate("company")
          .populate("assignedRepresentative")

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
  },
  Mutation: {
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

        await newCustomer
          .populate("company")
          .populate("assignedRepresentative")
          .execPopulate()

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
          .populate("company")
          .populate("assignedRepresentative")

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

        await newAppointment
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
          .execPopulate()

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

        return updatedAppointment
      } catch (e) {}
    },
    cancelAppointment: async (_: any, args: { id: string }) => {
      try {
        await AppointmentModel.findOneAndDelete({ _id: args.id })

        return "Appointment deleted"
      } catch (e) {}
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

server
  .listen(port)
  .then(({ url }) => console.log(`🚀 Server is listening on ${url}`))

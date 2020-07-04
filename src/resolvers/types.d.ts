export interface IAppointment {
  id?: string
  datetime: string
  customer: string
  salesRepresentative: string
}

export interface ICompany {
  id?: string
  name: string
  address: string
}

export interface ICustomer {
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

export interface ISalesRepresentative {
  id?: string
  name: string
  personalPhone: string
  workPhone: string
  personalEmail: string
  workEmail: string
}

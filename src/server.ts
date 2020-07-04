import "./db"
import { ApolloServer } from "apollo-server"
import typeDefs from "./schema.graphql"
import { Query, Mutation, Appointment, Customer } from "./resolvers"

const port = process.env.PORT || 4000

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Customer,
    Appointment,
  },
  introspection: true,
  playground: true,
})

server
  .listen(port)
  .then(({ url }) => console.log(`🚀 Server is listening on ${url}`))

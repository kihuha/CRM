import "./db"
import { ApolloServer, PubSub } from "apollo-server"
import typeDefs from "./schema.graphql"
import {
  Query,
  Mutation,
  Appointment,
  Customer,
  Subscription,
} from "./resolvers"

const port = process.env.PORT || 4000
const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Customer,
    Appointment,
  },
  context: {
    pubsub,
  },
  introspection: true,
  playground: true,
})

server
  .listen(port)
  .then(({ url }) => console.log(`🚀 Server is listening on ${url}`))

const Subscription = {
  count: {
    subscribe: (parent: any, args: any, context: any, info: any) {
      let count = 0

      return context.pubsub.asyncGenerator("count")
    },
  },
}

export { Subscription as default }

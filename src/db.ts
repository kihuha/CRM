import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017/crm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

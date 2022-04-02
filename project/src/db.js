import mongoose from "mongoose";

mongoose.connect(process.env.MOGODB_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const db = mongoose.connection;

import mongoose from "mongoose";
import "dotenv/config";

const { MOGODB_ATLAS } = process.env;

mongoose.connect(String(MOGODB_ATLAS));

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "❌ You can not connect in database"),
);

db.once("open", function () {
  console.log("✅ Database is Conntect");
});

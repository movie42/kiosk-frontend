import "dotenv/config";
import app from "./app";
import { db } from "./db";

const PORT = process.env.PORT || 5500;

db.on(
  "error",
  console.error.bind(console, "❌ You can not connect in database"),
);
db.once("open", function () {
  console.log("✅ Database is Conntect");
});

app.listen(PORT, () =>
  console.log(`✅ App is Running : http://localhost:${PORT}`),
);

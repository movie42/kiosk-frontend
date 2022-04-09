import * as dotenv from "dotenv";
import app from "./app";
import "./db";

dotenv.config();

const PORT = process.env.PORT || 5500;

app.listen(PORT, () =>
  console.log(`✅ App is Running : http://localhost:${PORT}`),
);

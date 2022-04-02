import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ data: { success: true } });
});

export default app;

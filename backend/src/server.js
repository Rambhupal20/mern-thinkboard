import express from "express";
import cors from "cors";
import dotenv from "dotenv"

import notesRouts from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";



connectDB();
dotenv.config();


const app = express();
const PORT =process.env.PORT || 5001




app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
app.use(express.json());
app.use(rateLimiter);



app.use("/api/notes", notesRouts)


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});



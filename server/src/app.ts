// src/app.ts
import express, {
  Application, Request, Response, NextFunction,
} from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes"; // Import the authentication routes
import "dotenv/config";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(cors({
  origin:"http://localhost:4200",
  credentials: true,
}));

app.use(bodyParser.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});


const mongoUri = process.env.MONGODBURI || "";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((res) => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(
      "Initial Distribution API Database connection error occurred -",
      err,
    );
  });
export default app;

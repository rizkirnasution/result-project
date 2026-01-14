import express, { Request, Response, NextFunction } from "express";
import todoRoute from "./src/routes/todo.route";
import userRoute from "./src/routes/user.route";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.use("/api/todo", todoRoute);
app.use("/api/user", userRoute);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  res.status(400).json({
    message: err.message || "Unexpected error",
  });
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server jalan ${PORT}`));

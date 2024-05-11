import express from "express";
import cors from "cors";
import morgan from "morgan";
import { Server } from "./server/express.js";
import { Mongo } from "./database/client.js";
import { ErrorMiddleware } from "./middleware/error.middleware.js";
import { resizableRouter } from "./routes/index.js";
import dotenv from "dotenv";
import { recordActionsMiddleware } from "./middleware/record-actions.middleware.js";

// setting up the environment variables
dotenv.config();

// port and mongo uri
const PORT = process.env.PORT ?? 3000;
const MONGO =
  process.env.MONGO_URI ?? "mongodb://localhost:27017/resizable_components";

//  setting up the server
const server = new Server({ port: PORT });

// setting up middlewares
server.setMiddlewares(express.json(), cors(), morgan("dev"));

// Routes
server.app.use(`/api/v1/resizable`, recordActionsMiddleware, resizableRouter);

// Error middleware
server.app.use(ErrorMiddleware.error);

// starting the server
server.listen(async () => {
  await new Mongo({ url: MONGO }).connect();
  console.log(
    `resizable server running on http://0.0.0.0:${PORT}/resizable_components`
  );
});

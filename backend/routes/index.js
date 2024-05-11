import { Router } from "express";
import { ResizableComponents } from "../controller/resizable.controller.js";

const resizableRouter = Router();

resizableRouter.post("/", ResizableComponents.addNewEntry);
resizableRouter.get("/", ResizableComponents.getAllEntries);
resizableRouter.put("/:id", ResizableComponents.updateEntry);
resizableRouter.get("/count", ResizableComponents.countEntries);

export { resizableRouter };

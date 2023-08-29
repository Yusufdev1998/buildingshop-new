import { Router } from "express";
import { createBrand, getBrends } from "../../controllers/brend.controller";

const brendRouter = Router();

brendRouter.get("/", getBrends);
brendRouter.post("/", createBrand);

export default brendRouter;

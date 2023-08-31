import { Router } from "express";
import { get, create } from "../../controllers/branch.controller";

const branchRouter = Router();

branchRouter.get("/", get);
branchRouter.post("/", create);

export default branchRouter;

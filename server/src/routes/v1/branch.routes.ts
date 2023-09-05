import { Router } from "express";
import {
  get,
  create,
  update,
  destroy,
} from "../../controllers/branch.controller";

const branchRouter = Router();

branchRouter.get("/", get);
branchRouter.post("/", create);
branchRouter.patch("/:id", update);
branchRouter.delete("/:id", destroy);

export default branchRouter;

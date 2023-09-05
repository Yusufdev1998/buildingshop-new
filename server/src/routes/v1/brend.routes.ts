import { Router } from "express";
import {
  create,
  destroy,
  get,
  update,
} from "../../controllers/brend.controller";

const brendRouter = Router();

brendRouter.get("/", get);
brendRouter.post("/", create);
brendRouter.patch("/:id", update);
brendRouter.delete("/:id", destroy);

export default brendRouter;

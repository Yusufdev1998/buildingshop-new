import { Router } from "express";
import {
  get,
  create,
  update,
  destroy,
} from "../../controllers/builder.controller";

const builderRouter = Router();

builderRouter.get("/", get);
builderRouter.post("/", create);
builderRouter.patch("/:id", update);
builderRouter.delete("/:id", destroy);

export default builderRouter;

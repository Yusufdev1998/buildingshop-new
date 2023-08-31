import { Router } from "express";
import {
  create,
  get,
  login,
  signup,
} from "../../controllers/builder.controller";

const builderRouter = Router();

builderRouter.get("/", get);
builderRouter.post("/", create);
builderRouter.post("/signup", signup);
builderRouter.post("/login", login);

export default builderRouter;

import { Router } from "express";
import { get, sale, vozvrat } from "../../controllers/market.controller";

const marketRouter = Router();

marketRouter.get("/", get);
marketRouter.post("/sale", sale);
marketRouter.post("/vozvrat", vozvrat);

export default marketRouter;

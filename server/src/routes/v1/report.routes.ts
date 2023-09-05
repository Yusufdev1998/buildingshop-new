import { Router } from "express";

import { getBuildersReport } from "./../../controllers/report.controller";

const saleRouter = Router();

saleRouter.get("/builders", getBuildersReport);
saleRouter.get("/builders/:id", getBuildersReport);
export default saleRouter;

import { Router } from "express";

import { getBuildersReport } from "./../../controllers/report.controller";

const reportRouter = Router();

reportRouter.get("/", getBuildersReport);
reportRouter.get("/builders/:id", getBuildersReport);
export default reportRouter;

import { Router } from "express";

const router = Router();

router.get("/", getLoginPage);

export default router;

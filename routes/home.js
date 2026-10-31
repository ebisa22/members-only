import { Router } from "express";
import getHomePage from "../controllers/getHomePage.js";

const router=Router();

router.get("/",getHomePage);

export default router;
import { Router } from "express";
import getLoginPage from "../controllers/getLoginPage.js";
import {validate,validationFields} from "../login-validator.js";
import handleLogin from "../controllers/handleLogin.js";

const router = Router();

router.get("/", getLoginPage);
router.post("/",validationFields,validate,handleLogin);

export default router;

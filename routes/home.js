import { Router } from "express";
import getHomePage from "../controllers/getHomePage.js";
import handleMembership from "../controllers/handleMembership.js";
import handleAdmin from "../controllers/handleAdmin.js";
import logUserOut from "../controllers/logUserOut.js";
import getForgotPasswordPage from "../controllers/getForgotPasswordPage.js";
import checkUsernameForReset from "../controllers/checkUsernameForReset.js";
import checkSecretQuestion from "../controllers/checkSecretQuestion.js";
import { validate, validationFields } from "../reset-validator.js";
import resetPassword from "../controllers/resetPassword.js";

const router=Router();

router.get("/",getHomePage);
router.post("/join",handleMembership);
router.post("/become-admin",handleAdmin);
router.post("/logout",logUserOut);
router.get("/forgot-password",getForgotPasswordPage);
router.post("/forgot-password/username",checkUsernameForReset);
router.post("/forgot-password/verify",checkSecretQuestion);
router.post("/forgot-password/reset",validationFields,validate,resetPassword);

export default router;
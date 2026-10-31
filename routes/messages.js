import { Router } from "express";
import getMessagesPage from "../controllers/getMessagesPage.js";
import createMessage from "../controllers/createMessage.js";
import deleteMessage from "../controllers/deleteMessage.js";


const router=Router();

router.get("/",getMessagesPage);
router.post("/",createMessage);
router.post("/:message_id/delete",deleteMessage);

export default router;

 
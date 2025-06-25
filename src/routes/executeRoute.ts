import express from "express";
import { executeController } from "../controllers/executeController.js";

const router = express.Router();

router.get("/", executeController);

export default router;

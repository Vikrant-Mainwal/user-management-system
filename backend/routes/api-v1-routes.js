import express from "express";

import userRoutes from "./api-v1/userRoutes.js"
import adminRoutes from "./api-v1/adminRoutes.js"

const router = express.Router();


router.use("/user", userRoutes);

router.use("/admin", adminRoutes);

export default router;
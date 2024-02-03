import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createCategoryController, deleteCategoryController, getAllCategoryController, getCatgoryBySlugController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

router.get("/get-all-category", requireSignIn, isAdmin, getAllCategoryController);

router.get("/get-category/:slug", requireSignIn, isAdmin, getCatgoryBySlugController);

router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

export default router;
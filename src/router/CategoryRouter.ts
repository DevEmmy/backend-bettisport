import Container from "typedi";
import { CategoryController } from "../controllers/CategoryController";
import Router, { Request, Response } from "express";

const categoryRouter = Router();
const categoryController = Container.get(CategoryController);

categoryRouter.post("/", (req: Request, res: Response) => categoryController.createCategory(req, res));
categoryRouter.get("/:id", (req: Request, res: Response) => categoryController.getCategoryById(req, res));
categoryRouter.get("/", (req: Request, res: Response) => categoryController.getAllCategories(req, res));
categoryRouter.put("/:id", (req: Request, res: Response) => categoryController.updateCategory(req, res));
categoryRouter.delete("/:id", (req: Request, res: Response) => categoryController.deleteCategory(req, res));
categoryRouter.get("/slug/:slug", (req: Request, res: Response) => categoryController.findCategoryBySlug(req, res));
categoryRouter.get("/parent/:parentCategory", (req: Request, res: Response) => categoryController.findCategoriesByParentCategory(req, res));
categoryRouter.patch("/:id", (req: Request, res: Response) => categoryController.updatePartialCategory(req, res));

export default categoryRouter;
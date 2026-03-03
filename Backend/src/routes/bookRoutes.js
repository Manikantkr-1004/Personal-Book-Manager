import {Router} from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createBook, deleteBook, getBook, updateBook } from "../controllers/bookController.js";

const bookRouter = Router();

bookRouter.post("/", protect, createBook);
bookRouter.get("/", protect, getBook);
bookRouter.put("/:bookId", protect, updateBook);
bookRouter.delete("/:bookId", protect, deleteBook);

export default bookRouter;
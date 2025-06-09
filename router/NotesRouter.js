import { Router } from "express";
import {
  addnote,
  viewNotes,
  deleteNote,
  deleteAllNote,
  updateNote,
} from "../controllers/NotesController.js";
import authMiddleware from "../middleware/AuthenticationMiddleware.js";
import { addNoteSchema } from "../model/zod.schema.js";
import { ValidationMiddleware } from "../middleware/zod.middleware.js";
const notesRouter = Router();

// notes add
notesRouter
  .route("/add")
  .post(authMiddleware, ValidationMiddleware(addNoteSchema), addnote);

// notes notes view
notesRouter.route("/view").get(authMiddleware, viewNotes);

// notes delete single
notesRouter.route("/delete/:id").delete(authMiddleware, deleteNote);

// notes delete all
notesRouter.route("/deleteAll").delete(authMiddleware, deleteAllNote);

// update note
notesRouter.route("/update/:id").patch(authMiddleware, updateNote);

export default notesRouter;

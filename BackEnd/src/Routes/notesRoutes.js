import express from "express";
import {getAllNotes, createNewNotes, updateNotes, deleteNotes} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNewNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;
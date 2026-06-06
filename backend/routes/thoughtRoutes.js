import express from "express";
import {
  createThought,
  getMyThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  createFollowUpThought,
  getThoughtThread,
  getThoughtCalendarDates,
  getThoughtsByDate,
  searchThoughts,
  togglePinThought
} from "../controllers/thoughtController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { validateThoughtInput } from "../middleware/validateThoughtInput.js";
import { checkThoughtOwnership } from "../middleware/checkThoughtOwnership.js";

const router = express.Router();

router.use(authenticateUser);

router.post("/", validateThoughtInput, createThought);

router.get("/", getMyThoughts);

router.get("/calendar/dates", getThoughtCalendarDates);

router.get("/date/:date", getThoughtsByDate);

router.get("/search", searchThoughts);

router.get("/:id", checkThoughtOwnership, getThoughtById);

router.put("/:id", checkThoughtOwnership, validateThoughtInput, updateThought);

router.patch("/:id/pin", checkThoughtOwnership, togglePinThought);

router.delete("/:id", checkThoughtOwnership, deleteThought);

router.post(
  "/:id/follow-ups",
  checkThoughtOwnership,
  validateThoughtInput,
  createFollowUpThought
);

router.get("/:id/thread", checkThoughtOwnership, getThoughtThread);

export default router;
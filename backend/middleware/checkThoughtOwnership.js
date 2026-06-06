import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

export const checkThoughtOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid thought ID",
      });
    }

    const db = getDB();
    const thoughtsCollection = db.collection("thoughts");

    const thought = await thoughtsCollection.findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(req.user._id),
    });

    if (!thought) {
      return res.status(404).json({
        message: "Thought not found",
      });
    }

    req.thought = thought;
    next();
  } catch (error) {
    console.error("Check thought ownership error:", error);
    return res.status(500).json({
      message: "Server error while checking thought ownership",
    });
  }
};
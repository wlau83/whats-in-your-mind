import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

export const createThought = async (req, res) => {
  try {
    const db = getDB();
    const thoughtsCollection = db.collection("thoughts");

    const { content, mood = "neutral", tags = [] } = req.body;

    const newThought = {
      userId: new ObjectId(req.user._id),
      content: content.trim(),
      mood,
      tags,
      parentThoughtId: null,
      isPinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await thoughtsCollection.insertOne(newThought);

    return res.status(201).json({
      message: "Thought created successfully",
      thought: {
        _id: result.insertedId,
        ...newThought,
      },
    });
  } catch (error) {
    console.error("Create thought error:", error);
    return res.status(500).json({
      message: "Server error while creating thought",
    });
  }
};

export const getMyThoughts = async (req, res) => {
  try {
    const db = getDB();
    const thoughtsCollection = db.collection("thoughts");

    const thoughts = await thoughtsCollection
      .aggregate([
        {
          $match: {
            userId: new ObjectId(req.user._id),
            parentThoughtId: null,
          },
        },
        {
          $lookup: {
            from: "thoughts",
            let: { thoughtId: "$_id", currentUserId: "$userId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$parentThoughtId", "$$thoughtId"] },
                      { $eq: ["$userId", "$$currentUserId"] },
                    ],
                  },
                },
              },
            ],
            as: "followUps",
          },
        },
        {
          $addFields: {
            followUpCount: { $size: "$followUps" },
          },
        },
        {
          $project: {
            followUps: 0,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .toArray();

    return res.status(200).json({
      thoughts,
    });
  } catch (error) {
    console.error("Get thoughts error:", error);
    return res.status(500).json({
      message: "Server error while getting thoughts",
    });
  }
};

export const getThoughtById = async (req, res) => {
  return res.status(200).json({
    thought: req.thought,
  });
};

export const updateThought = async (req, res) => {
  try {
    const db = getDB();
    const thoughtsCollection = db.collection("thoughts");

    const { content, mood = "neutral", tags = [] } = req.body;

    await thoughtsCollection.updateOne(
      {
        _id: new ObjectId(req.params.id),
        userId: new ObjectId(req.user._id),
      },
      {
        $set: {
          content: content.trim(),
          mood,
          tags,
          updatedAt: new Date(),
        },
      }
    );

    const updatedThought = await thoughtsCollection.findOne({
      _id: new ObjectId(req.params.id),
      userId: new ObjectId(req.user._id),
    });

    return res.status(200).json({
      message: "Thought updated successfully",
      thought: updatedThought,
    });
  } catch (error) {
    console.error("Update thought error:", error);
    return res.status(500).json({
      message: "Server error while updating thought",
    });
  }
};

export const deleteThought = async (req, res) => {
  try {
    const db = getDB();
    const thoughtsCollection = db.collection("thoughts");

    await thoughtsCollection.deleteMany({
      $or: [
        {
          _id: new ObjectId(req.params.id),
          userId: new ObjectId(req.user._id),
        },
        {
          parentThoughtId: new ObjectId(req.params.id),
          userId: new ObjectId(req.user._id),
        },
      ],
    });

    return res.status(200).json({
      message: "Thought and related follow-ups deleted successfully",
    });
  } catch (error) {
    console.error("Delete thought error:", error);
    return res.status(500).json({
      message: "Server error while deleting thought",
    });
  }
};

export const createFollowUpThought = async (req, res) => {
  try {
    const db = getDB();
    const thoughtsCollection = db.collection("thoughts");

    const { content, mood = "thoughtful", tags = [] } = req.body;

    const followUpThought = {
      userId: new ObjectId(req.user._id),
      content: content.trim(),
      mood,
      tags,
      parentThoughtId: new ObjectId(req.params.id),
      isPinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await thoughtsCollection.insertOne(followUpThought);

    return res.status(201).json({
      message: "Follow-up thought created successfully",
      thought: {
        _id: result.insertedId,
        ...followUpThought,
      },
    });
  } catch (error) {
    console.error("Create follow-up thought error:", error);
    return res.status(500).json({
      message: "Server error while creating follow-up thought",
    });
  }
};

export const getThoughtThread = async (req, res) => {
  try {
    const db = getDB();
    const thoughtsCollection = db.collection("thoughts");

    const followUps = await thoughtsCollection
      .find({
        userId: new ObjectId(req.user._id),
        parentThoughtId: new ObjectId(req.params.id),
      })
      .sort({ createdAt: 1 })
      .toArray();

    return res.status(200).json({
      originalThought: req.thought,
      followUps,
    });
  } catch (error) {
    console.error("Get thought thread error:", error);
    return res.status(500).json({
      message: "Server error while getting thought thread",
    });
  }
};

export const getThoughtCalendarDates = async (req, res) => {
  try {
    const db = getDB();
    const thoughtsCollection = db.collection("thoughts");

    const thoughts = await thoughtsCollection
      .find(
        { userId: new ObjectId(req.user._id) },
        { projection: { createdAt: 1 } }
      )
      .toArray();

    const dates = [
      ...new Set(
        thoughts.map((thought) =>
          new Date(thought.createdAt).toISOString().split("T")[0]
        )
      ),
    ];

    return res.status(200).json({ dates });
  } catch (error) {
    console.error("Get calendar dates error:", error);
    return res.status(500).json({
      message: "Server error while getting calendar dates",
    });
  }
};

export const getThoughtsByDate = async (req, res) => {
  try {
    const db = getDB();
    const thoughtsCollection = db.collection("thoughts");

    const { date } = req.params;

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(`${date}T23:59:59.999Z`);

    // 1. Get all thoughts created on this date
    const thoughtsForDate = await thoughtsCollection
      .find({
        userId: new ObjectId(req.user._id),
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .sort({ createdAt: 1 })
      .toArray();

    // 2. Separate original thoughts and follow-up thoughts
    const originalThoughts = thoughtsForDate.filter(
      (thought) => thought.parentThoughtId === null
    );

    const followUpThoughts = thoughtsForDate.filter(
      (thought) => thought.parentThoughtId !== null
    );

    // 3. Some follow-ups may belong to original thoughts created on another date.
    //    We still need to show their parent original thought.
    const parentIdsFromFollowUps = followUpThoughts.map(
      (followUp) => followUp.parentThoughtId
    );

    const existingOriginalIds = originalThoughts.map((thought) =>
      thought._id.toString()
    );

    const missingParentIds = parentIdsFromFollowUps.filter(
      (parentId) =>
        parentId &&
        !existingOriginalIds.includes(parentId.toString())
    );

    let missingParentThoughts = [];

    if (missingParentIds.length > 0) {
      missingParentThoughts = await thoughtsCollection
        .find({
          userId: new ObjectId(req.user._id),
          _id: {
            $in: missingParentIds.map((id) => new ObjectId(id)),
          },
        })
        .sort({ createdAt: 1 })
        .toArray();
    }

    const allOriginalThoughts = [
      ...originalThoughts,
      ...missingParentThoughts,
    ];

    // 4. Group follow-ups under their original thought
    const groupedThoughts = allOriginalThoughts
      .map((originalThought) => {
        const followUps = followUpThoughts
          .filter(
            (followUp) =>
              followUp.parentThoughtId?.toString() ===
              originalThought._id.toString()
          )
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        return {
          originalThought,
          followUps,
        };
      })
      .filter((group) => {
        // Keep group if:
        // - original was created on selected date, or
        // - it has follow-ups created on selected date
        const originalCreatedOnSelectedDate =
          group.originalThought.createdAt >= startDate &&
          group.originalThought.createdAt <= endDate;

        return originalCreatedOnSelectedDate || group.followUps.length > 0;
      })
      .sort((a, b) => {
        const aTime = new Date(a.originalThought.createdAt);
        const bTime = new Date(b.originalThought.createdAt);
        return aTime - bTime;
      });

    return res.status(200).json({
      date,
      groups: groupedThoughts,
    });
  } catch (error) {
    console.error("Get thoughts by date error:", error);
    return res.status(500).json({
      message: "Server error while getting thoughts by date",
    });
  }
};

export const searchThoughts = async (req, res) => {
  try {
    const db = getDB();
    const thoughtsCollection = db.collection("thoughts");

    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const searchText = q.trim();

    const thoughts = await thoughtsCollection
      .aggregate([
        {
          $match: {
            userId: new ObjectId(req.user._id),
            $or: [
              { content: { $regex: searchText, $options: "i" } },
              { mood: { $regex: searchText, $options: "i" } },
              { tags: { $regex: searchText, $options: "i" } },
            ],
          },
        },
        {
          $lookup: {
            from: "thoughts",
            localField: "parentThoughtId",
            foreignField: "_id",
            as: "parentThought",
          },
        },
        {
          $addFields: {
            parentThought: { $arrayElemAt: ["$parentThought", 0] },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .toArray();

    return res.status(200).json({
      query: searchText,
      results: thoughts,
    });
  } catch (error) {
    console.error("Search thoughts error:", error);
    return res.status(500).json({
      message: "Server error while searching thoughts",
    });
  }
};
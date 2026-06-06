export const validateThoughtInput = (req, res, next) => {
  const { content, mood, tags } = req.body || {};

  if (!content || content.trim().length === 0) {
    return res.status(400).json({
      message: "Thought content is required",
    });
  }

  if (content.trim().length > 3000) {
    return res.status(400).json({
      message: "Thought content cannot be longer than 3000 characters",
    });
  }

  const allowedMoods = [
    "happy",
    "neutral",
    "anxious",
    "sad",
    "angry",
    "inspired",
    "thoughtful",
  ];

  if (mood && !allowedMoods.includes(mood)) {
    return res.status(400).json({
      message: "Invalid mood value",
    });
  }

  if (tags && !Array.isArray(tags)) {
    return res.status(400).json({
      message: "Tags must be an array",
    });
  }

  if (tags && tags.length > 10) {
    return res.status(400).json({
      message: "You can add up to 10 tags only",
    });
  }

  next();
};
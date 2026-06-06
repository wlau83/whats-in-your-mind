import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ThoughtForm = ({ onThoughtCreated }) => {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("neutral");
  const [tagsText, setTagsText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const tags = tagsText
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    try {
      const response = await axiosInstance.post("/thoughts", {
        content,
        mood,
        tags,
      });

      onThoughtCreated(response.data.thought);

      setContent("");
      setMood("neutral");
      setTagsText("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to create thought."
      );
    }
  };

  return (
    <section>
      <h2>What’s in your mind?</h2>

      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Your thought</label>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write what you're thinking right now..."
            rows="5"
            required
          />
        </div>

        <div>
          <label>Mood</label>
          <select
            value={mood}
            onChange={(event) => setMood(event.target.value)}
          >
            <option value="happy">Happy</option>
            <option value="neutral">Neutral</option>
            <option value="anxious">Anxious</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="inspired">Inspired</option>
            <option value="thoughtful">Thoughtful</option>
          </select>
        </div>

        <div>
          <label>Tags</label>
          <input
            type="text"
            value={tagsText}
            onChange={(event) => setTagsText(event.target.value)}
            placeholder="project, career, random"
          />
          <small>Separate tags with commas.</small>
        </div>

        <button type="submit">Save Thought</button>
      </form>
    </section>
  );
};

export default ThoughtForm;
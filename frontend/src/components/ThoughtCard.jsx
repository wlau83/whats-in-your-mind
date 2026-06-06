import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ThoughtCard = ({
  thought,
  onThoughtUpdated,
  onThoughtDeleted,
  onThoughtPinned,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);
  const [showThread, setShowThread] = useState(false);

  const [content, setContent] = useState(thought.content);
  const [mood, setMood] = useState(thought.mood || "neutral");
  const [tagsText, setTagsText] = useState(thought.tags?.join(", ") || "");

  const [followUpContent, setFollowUpContent] = useState("");
  const [followUpMood, setFollowUpMood] = useState("thoughtful");
  const [followUpTagsText, setFollowUpTagsText] = useState("");

  const [thread, setThread] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdate = async () => {
    setErrorMessage("");

    const tags = tagsText
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    try {
      const response = await axiosInstance.put(`/thoughts/${thought._id}`, {
        content,
        mood,
        tags,
      });

      onThoughtUpdated(response.data.thought);
      setIsEditing(false);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to update thought."
      );
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this thought? Related follow-ups will also be deleted."
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/thoughts/${thought._id}`);
      onThoughtDeleted(thought._id);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to delete thought."
      );
    }
  };

  const handleTogglePin = async () => {
  setErrorMessage("");

  try {
    const response = await axiosInstance.patch(`/thoughts/${thought._id}/pin`);

    if (typeof onThoughtPinned !== "function") {
      throw new Error("onThoughtPinned is not passed to ThoughtCard");
    }

    onThoughtPinned(response.data.thought);
  } catch (error) {
    console.error("Pin error:", error);

    setErrorMessage(
      error.response?.data?.message ||
        error.message ||
        "Failed to update pinned status."
    );
  }
};

  const handleCancel = () => {
    setContent(thought.content);
    setMood(thought.mood || "neutral");
    setTagsText(thought.tags?.join(", ") || "");
    setIsEditing(false);
    setErrorMessage("");
  };

  const handleCreateFollowUp = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const tags = followUpTagsText
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    try {
      await axiosInstance.post(`/thoughts/${thought._id}/follow-ups`, {
        content: followUpContent,
        mood: followUpMood,
        tags,
      });

      setFollowUpContent("");
      setFollowUpMood("thoughtful");
      setFollowUpTagsText("");
      setShowFollowUpForm(false);

      await fetchThread();
      setShowThread(true);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to create follow-up thought."
      );
    }
  };

  const fetchThread = async () => {
    try {
      const response = await axiosInstance.get(`/thoughts/${thought._id}/thread`);
      setThread(response.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to load thought thread."
      );
    }
  };

  const handleToggleThread = async () => {
    if (!showThread && !thread) {
      await fetchThread();
    }

    setShowThread((prev) => !prev);
  };

  return (
    <article>
      {errorMessage && <p>{errorMessage}</p>}

      {isEditing ? (
        <>
          <div>
            <label>Thought</label>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows="4"
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
            />
          </div>

          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
        <p>{thought.content}</p>

          <p>
            <strong>Mood:</strong> {thought.mood}
          </p>

          {thought.tags?.length > 0 && (
            <p>
              <strong>Tags:</strong> {thought.tags.join(", ")}
            </p>
          )}

          <small>
            Created at: {new Date(thought.createdAt).toLocaleString()}
          </small>
          <p>
            <strong>Follow-ups:</strong> {thought.followUpCount || 0}
          </p>
          <div className="thought-actions">
            <button className="secondary-button" onClick={() => setIsEditing(true)}>
                Edit
            </button>

            <button className="danger-button" onClick={handleDelete}>
                Delete
            </button>

            <button className="pin-button" onClick={handleTogglePin}>
                {thought.isPinned ? "Unpin" : "Pin"}
            </button>

            <button
                className="secondary-button"
                onClick={() => setShowFollowUpForm((prev) => !prev)}
            >
                Add Follow-up
            </button>

            <button className="secondary-button" onClick={handleToggleThread}>
                {showThread ? "Hide Thread" : "View Thread"}
            </button>
          </div>
        </>
      )}

      {showFollowUpForm && (
        <form onSubmit={handleCreateFollowUp}>
          <h4>Continue this thought</h4>

          <div>
            <label>Follow-up thought</label>
            <textarea
              value={followUpContent}
              onChange={(event) => setFollowUpContent(event.target.value)}
              rows="3"
              required
            />
          </div>

          <div>
            <label>Mood</label>
            <select
              value={followUpMood}
              onChange={(event) => setFollowUpMood(event.target.value)}
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
              value={followUpTagsText}
              onChange={(event) => setFollowUpTagsText(event.target.value)}
              placeholder="reflection, comedy, update"
            />
          </div>

          <button type="submit">Save Follow-up</button>
        </form>
      )}

      {showThread && thread && (
    <section className="thought-thread-panel">
        <div className="thought-thread-header">
        <h4>Follow-up Thread</h4>
        <span>{thread.followUps.length} follow-up(s)</span>
        </div>

        <div className="thread-followups">
        {thread.followUps.length === 0 ? (
            <p className="thread-empty-text">No follow-ups yet.</p>
        ) : (
            thread.followUps.map((followUp) => (
            <div key={followUp._id} className="thread-followup-item">
                <div className="thread-followup-top">
                <small>
                    {new Date(followUp.createdAt).toLocaleString()}
                </small>
                </div>

                <p className="thread-content">{followUp.content}</p>

                <div className="thread-meta">
                <small>Mood: {followUp.mood}</small>

                {followUp.tags?.length > 0 && (
                    <small>Tags: {followUp.tags.join(", ")}</small>
                )}
                </div>
            </div>
            ))
        )}
        </div>
    </section>
    )}
    </article>
  );
};

export default ThoughtCard;
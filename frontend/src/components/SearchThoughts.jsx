import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const SearchThoughts = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openThreadId, setOpenThreadId] = useState(null);
  const [threadData, setThreadData] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setHasSearched(true);

    if (!query.trim()) {
      setResults([]);
      setErrorMessage("Please enter something to search.");
      return;
    }

    try {
      const response = await axiosInstance.get("/api/thoughts/search", {
        params: {
          q: query.trim(),
        },
      });

      setResults(response.data.results || []);
    } catch (error) {
      setResults([]);
      setErrorMessage(
        error.response?.data?.message || "Failed to search thoughts."
      );
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    setErrorMessage("");
  };

  const handleViewThread = async (thought) => {
  setErrorMessage("");

  try {
    const targetThoughtId = thought.parentThoughtId
      ? thought.parentThoughtId
      : thought._id;

    if (openThreadId === targetThoughtId) {
      setOpenThreadId(null);
      setThreadData(null);
      return;
    }

    const response = await axiosInstance.get(
      `/api/thoughts/${targetThoughtId}/thread`
    );

    setOpenThreadId(targetThoughtId);
    setThreadData(response.data);
  } catch (error) {
    setErrorMessage(
      error.response?.data?.message || "Failed to load thought thread."
    );
  }
};

  return (
    <section className="search-section">
      <div className="search-header">
        <div>
          <h2>Search Thoughts</h2>
          <p>Find previous thoughts, follow-ups, tags, or moods.</p>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by content, tag, or mood..."
        />

        <div className="search-actions">
          <button type="submit">Search</button>
          <button type="button" className="secondary-button" onClick={clearSearch}>
            Clear
          </button>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {hasSearched && !errorMessage && (
        <div className="search-results">
          <p className="search-summary">
            {results.length} result(s) found for "{query}"
          </p>

          {results.map((thought) => (
            <article key={thought._id} className="search-result-card">
              <div className="search-result-top">
                <span
                  className={
                    thought.parentThoughtId
                      ? "thought-type-badge follow-up"
                      : "thought-type-badge original"
                  }
                >
                  {thought.parentThoughtId ? "Follow-up" : "Original"}
                </span>

                <small>{new Date(thought.createdAt).toLocaleString()}</small>
              </div>

              {thought.parentThoughtId && thought.parentThought && (
                <div className="search-parent-preview">
                  <span>Follow-up to</span>
                  <p>{thought.parentThought.content}</p>
                </div>
              )}

              <p className="search-result-content">{thought.content}</p>

              <div className="search-result-footer">
                <span>Mood: {thought.mood}</span>

                {thought.tags?.length > 0 && (
                  <span>Tags: {thought.tags.join(", ")}</span>
                )}
              </div>
              <button
                type="button"
                className="secondary-button search-thread-button"
                onClick={() => handleViewThread(thought)}
                >
                {openThreadId === (thought.parentThoughtId || thought._id)
                    ? "Hide Thread"
                    : "View Thread"}
              </button>

              {openThreadId === (thought.parentThoughtId || thought._id) && threadData && (
                <div className="search-thread-preview">
                    <div className="search-thread-original">
                    <span className="thought-type-badge original">Original</span>
                    <p>{threadData.originalThought.content}</p>
                    <small>
                        {new Date(threadData.originalThought.createdAt).toLocaleString()}
                    </small>
                    </div>

                    <div className="search-thread-followups">
                    <strong>Follow-ups</strong>

                    {threadData.followUps.length === 0 ? (
                        <p>No follow-ups yet.</p>
                    ) : (
                        threadData.followUps.map((followUp) => (
                        <div key={followUp._id} className="search-thread-followup-item">
                            <span className="thought-type-badge follow-up">Follow-up</span>
                            <p>{followUp.content}</p>
                            <small>{new Date(followUp.createdAt).toLocaleString()}</small>
                        </div>
                        ))
                    )}
                    </div>
                </div>
                )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchThoughts;
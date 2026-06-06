import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const SearchThoughts = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await axiosInstance.get("/thoughts/search", {
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
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchThoughts;
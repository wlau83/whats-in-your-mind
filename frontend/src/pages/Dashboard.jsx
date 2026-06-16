import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import ThoughtForm from "../components/ThoughtForm";
import ThoughtList from "../components/ThoughtList";
import ThoughtCalendar from "../components/ThoughtCalendar";
import SearchThoughts from "../components/SearchThoughts";

const Dashboard = () => {
  const { user } = useAuth();

  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchThoughts = async () => {
    try {
      const response = await axiosInstance.get("/api/thoughts");
      setThoughts(response.data.thoughts);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to load thoughts."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleThoughtCreated = (newThought) => {
    setThoughts((prevThoughts) => [newThought, ...prevThoughts]);
  };

  const handleThoughtUpdated = (updatedThought) => {
    setThoughts((prevThoughts) =>
      prevThoughts.map((thought) =>
        thought._id === updatedThought._id ? updatedThought : thought
      )
    );
  };

  const handleThoughtDeleted = (thoughtId) => {
    setThoughts((prevThoughts) =>
      prevThoughts.filter((thought) => thought._id !== thoughtId)
    );
  };

  const handleThoughtPinned = (updatedThought) => {
    setThoughts((prevThoughts) =>
      prevThoughts.map((thought) =>
        thought._id === updatedThought._id ? updatedThought : thought
      )
    );
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  const pinnedThoughts = thoughts.filter((thought) => thought.isPinned);
  const regularThoughts = thoughts.filter((thought) => !thought.isPinned);

  return (
    <main className="dashboard-page">
      <section className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Hi {user?.username}, what’s on your mind today?</p>
      </section>

      <section className="dashboard-layout">
        <div className="dashboard-left">
          <ThoughtForm onThoughtCreated={handleThoughtCreated} />

          <SearchThoughts />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {loading ? (
            <p>Loading thoughts...</p>
          ) : (
            <>
              {pinnedThoughts.length > 0 && (
                <section className="pinned-section">
                  <ThoughtList
                    title="Pinned Thoughts"
                    thoughts={pinnedThoughts}
                    onThoughtUpdated={handleThoughtUpdated}
                    onThoughtDeleted={handleThoughtDeleted}
                    onThoughtPinned={handleThoughtPinned}
                  />
                </section>
              )}

              <ThoughtList
                title="Recent Thoughts"
                thoughts={regularThoughts}
                onThoughtUpdated={handleThoughtUpdated}
                onThoughtDeleted={handleThoughtDeleted}
                onThoughtPinned={handleThoughtPinned}
              />
            </>
          )}
        </div>

        <aside className="dashboard-right">
          <ThoughtCalendar />
        </aside>
      </section>
    </main>
  );
};

export default Dashboard;
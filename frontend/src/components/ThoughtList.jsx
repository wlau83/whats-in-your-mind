import ThoughtCard from "./ThoughtCard";

const ThoughtList = ({ thoughts, onThoughtUpdated, onThoughtDeleted }) => {
  if (thoughts.length === 0) {
    return <p>No thoughts yet. Write your first one.</p>;
  }

  return (
    <section>
      <h2>Recent Thoughts</h2>

      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought._id}
          thought={thought}
          onThoughtUpdated={onThoughtUpdated}
          onThoughtDeleted={onThoughtDeleted}
        />
      ))}
    </section>
  );
};

export default ThoughtList;
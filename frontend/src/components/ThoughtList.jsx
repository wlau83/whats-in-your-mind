import ThoughtCard from "./ThoughtCard";

const ThoughtList = ({
  title = "Recent Thoughts",
  thoughts,
  onThoughtUpdated,
  onThoughtDeleted,
  onThoughtPinned,
}) => {
  if (thoughts.length === 0) {
    return <p>No thoughts yet. Write your first one.</p>;
  }

  return (
    <section>
      <h2>{title}</h2>

      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought._id}
          thought={thought}
          onThoughtUpdated={onThoughtUpdated}
          onThoughtDeleted={onThoughtDeleted}
          onThoughtPinned={onThoughtPinned}
        />
      ))}
    </section>
  );
};

export default ThoughtList;
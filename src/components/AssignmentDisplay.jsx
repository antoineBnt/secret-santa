export function AssignmentDisplay({ assignments }) {
  return (
    <ul className="space-y-2">
      {assignments.map((assignment, index) => (
        <li key={index}>
          <span className="font-semibold">{assignment.giver}</span> offre un
          beau cadeau à{" "}
          <span className="font-semibold">{assignment.receiver}</span>
        </li>
      ))}
    </ul>
  );
}

import { FaStar } from "react-icons/fa6";

const Stars = ({ rating, editable = false, onChange }) => {
  return (
    <span className="comment-stars" style={{ display: "inline-flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: editable ? "pointer" : "default",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => editable && onChange?.(star)}
        >
          <FaStar color={star <= rating ? "#ffc107" : "#495057"} />
        </span>
      ))}
    </span>
  );
};

export default Stars;
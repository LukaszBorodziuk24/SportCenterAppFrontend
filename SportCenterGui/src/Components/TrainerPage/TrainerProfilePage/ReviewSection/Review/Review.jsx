import PropTypes from "prop-types";
import "./Review.css";
import Stars from "../../../../SharedComponents/Stars/Stars";
import { formatDate } from "../../../../../utils/dateUtils";
import { FaEdit } from "react-icons/fa";

const Review = ({ rating, comment, userFullName, updatedAt, showEditButton = false, onEdit }) => {
  return (
    <div className="review-card d-flex flex-column p-3 mb-3 rounded-3 shadow-sm bg-dark bg-opacity-75 position-relative">
      {showEditButton && onEdit && (
        <button 
          className="position-absolute top-0 end-0 m-2 border-0 p-2"
          onClick={onEdit}
          style={{ 
            fontSize: '1.2rem', 
            color: '#20B2AA',
            backgroundColor: 'transparent'
          }}
        >
          <FaEdit />
        </button>
      )}
      
      <div className="d-flex align-items-center mb-2">
        <span className="review-user fw-bold me-2">{userFullName}</span>
        <Stars rating={rating} />
      </div>
      <div className="review-text text-light mb-2">{comment}</div>
      <div className="review-date small" style={{ color: '#d1d1d1' }}>
        {updatedAt ? formatDate(updatedAt) : 'No date available'}
      </div>
    </div>
  );
};

Review.propTypes = {
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string,
  userFullName: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  showEditButton: PropTypes.bool,
  onEdit: PropTypes.func
};

export default Review;
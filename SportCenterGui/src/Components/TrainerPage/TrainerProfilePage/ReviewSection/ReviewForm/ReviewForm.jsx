import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./ReviewForm.css";
import Stars from "../../../../SharedComponents/Stars/Stars";

const ReviewForm = ({ initialData = null, onSubmit, onCancel, isEditing = false }) => {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [comment, setComment] = useState(initialData?.comment || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setRating(initialData.rating || 0);
      setComment(initialData.comment || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || rating < 1) {
      alert("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      alert("Please write a review");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ rating, comment: comment.trim() });
      if (!isEditing) {
        setRating(0);
        setComment("");
      }
    } catch (error) {
      alert("An error occurred while saving the review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      setRating(initialData?.rating || 0);
      setComment(initialData?.comment || "");
      onCancel?.();
    } else {
      setRating(0);
      setComment("");
    }
  };

  return (
    <Form className="review-form p-3 rounded-3 mb-4 bg-dark bg-opacity-75 shadow-sm" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="reviewFormRating">
        <Form.Label className="text-light">Your Rating</Form.Label>
        <div className="stars-wrapper mt-1">
          <Stars rating={rating} editable={true} onChange={setRating} />
        </div>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="reviewFormComment">
        <Form.Label className="text-light">Your Comment</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Write your review about the trainer..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={4}
          required
          className="bg-dark text-light border-secondary"
          style={{ 
            backgroundColor: '#212529 !important',
            color: '#ffffff !important',
            borderColor: '#6c757d',
            resize: 'none'
          }}
        />
      </Form.Group>
      
      <div className="d-flex gap-2 justify-content-start">
        <Button 
          type="submit" 
          className="mainAppButton rounded-3 border-0 p-2 px-4" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Accept"}
        </Button>
        {isEditing && (
          <Button 
            type="button" 
            className="redAppButton rounded-3 border-0 p-2 px-4"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
};

ReviewForm.propTypes = {
  initialData: PropTypes.shape({
    rating: PropTypes.number,
    comment: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  isEditing: PropTypes.bool
};

export default ReviewForm;
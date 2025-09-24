import { useState, useEffect } from 'react';
import { Card, Alert, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import Review from "./Review/Review";
import ReviewForm from "./ReviewForm/ReviewForm";
import { useAuth } from "../../../../contexts/AuthContext";
import { reviewAPI } from "../../../../services/api";
import useFetchReviews from "../../../../hooks/useFetchReviews";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from 'react-loading';
import "./ReviewSection.css";

const ReviewSection = ({ trainerId, isCurrentUser = false }) => {
  const { isAuthorized } = useAuth();
  const initialPageSize = 10;
  const componentKey = 0;
  
  const {
    data: allReviews,
    hasMore: hasMoreReviews,
    showLoading: reviewsLoading,
    loadMore: loadMoreReviews
  } = useFetchReviews(trainerId, initialPageSize, componentKey);

  const [myReview, setMyReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMyReview = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (isAuthorized && trainerId && !isCurrentUser) {
          const review = await reviewAPI.getMyReview(trainerId);
          setMyReview(review);
        }
      } catch (err) {
        setError("An error occurred while loading your review");
      } finally {
        setLoading(false);
      }
    };

    loadMyReview();
  }, [trainerId, isAuthorized, isCurrentUser]);

  const handleSubmitReview = async (reviewData) => {
    await reviewAPI.createOrUpdateReview(trainerId, reviewData);
    
    const updatedReview = await reviewAPI.getMyReview(trainerId);
    setMyReview(updatedReview);
    
    setIsEditing(false);
  };

  const handleEditReview = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <Card className="blurBg border-0 rounded-4 shadow-sm review-section-card">
        <Card.Body className="text-center">
          <Spinner animation="border" />
          <div className="mt-2">Loading reviews...</div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="blurBg border-0 rounded-4 shadow-sm review-section-card">
      <Card.Body className="review-section-body">
        <div className="review-section-title">Reviews</div>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        {isAuthorized && !isCurrentUser && (
          <div className="my-review-section mb-1">
            {isEditing || !myReview ? (
              <ReviewForm
                initialData={myReview}
                onSubmit={handleSubmitReview}
                onCancel={handleCancelEdit}
                isEditing={isEditing}
              />
            ) : (
              <div className="my-review-display">
                <h6 className="text-muted mb-3">Your Review</h6>
                <Review
                  rating={myReview.rating || myReview.Rating}
                  comment={myReview.comment || myReview.Comment}
                  userFullName={myReview.userFullName || myReview.UserFullName}
                  updatedAt={myReview.updatedAt || myReview.UpdatedAt}
                  showEditButton={true}
                  onEdit={handleEditReview}
                />
              </div>
            )}
          </div>
        )}

        {!isAuthorized && !isCurrentUser && (
          <Alert variant="info" className="mb-1">
            Zaloguj się, aby dodać swoją opinię o tym trenerze
          </Alert>
        )}

        <div className="all-reviews-section flex-grow-1 d-flex flex-column">
          <h6 className="text-muted mb-3 flex-shrink-0">
            All Reviews {allReviews.length > 0 && `(${allReviews.length})`}
          </h6>
          
          {allReviews.length === 0 ? (
            <div className="text-muted text-center py-4">
              No reviews for this trainer
            </div>
          ) : (
            <div 
              id="review-scrollable-container" 
              className="flex-grow-1"
              style={{ 
                height: '50vh', 
                overflowY: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <InfiniteScroll
                key={componentKey}
                next={loadMoreReviews}
                hasMore={hasMoreReviews}
                loader={reviewsLoading ? 
                  <div className="d-flex justify-content-center align-items-center p-3">
                    <ReactLoading type="spin" color="#74b3a4" height="20px" width="20px" />
                  </div>
                  : null
                }
                dataLength={allReviews.length}
                scrollableTarget="review-scrollable-container"
              >
                {allReviews.map((review, idx) => (
                  <div key={idx}>
                    <Review
                      rating={review.rating}
                      comment={review.comment}
                      userFullName={review.userFullName}
                      updatedAt={review.updatedAt}
                    />
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          )}

        </div>
      </Card.Body>
    </Card>
  );
};

ReviewSection.propTypes = {
  trainerId: PropTypes.string.isRequired,
  isCurrentUser: PropTypes.bool
};

export default ReviewSection;
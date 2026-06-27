import "./TrainerInfoTile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { trainerAPI, reviewAPI } from "../../../../../../services/api.js";
import { useAuth } from "../../../../../../contexts/AuthContext";
import { FaUser, FaStar, FaCalendarAlt } from 'react-icons/fa';

const TrainerInfoTile = () => {
    const [trainer, setTrainer] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthorized } = useAuth();

    useEffect(() => {
        const fetchTrainerInfo = async () => {
            if (!isAuthorized) {
                setLoading(false);
                return;
            }

            try {
                // Get the trainer ID
                const trainerId = await trainerAPI.getTrainerId();
                
                if (!trainerId) {
                    throw new Error('No trainer ID found');
                }

                console.log('Retrieved trainer ID:', trainerId);

                // Fetch trainer profile details
                const profileData = await trainerAPI.getProfileDetails(trainerId);
                
                // Ensure we have the ID in profile data for proper navigation
                setTrainer({
                    ...profileData,
                    id: trainerId  // Make sure ID is included
                });

                console.log('Fetched profile data:', profileData);

                // Fetch 5 most recent reviews
                const reviewResponse = await reviewAPI.getReviews(trainerId, { 
                    pageNumber: 1, 
                    pageSize: 5 
                });
                
                console.log('Review API response:', reviewResponse);
                console.log('Review items:', reviewResponse.items);
                
                setReviews(reviewResponse.items || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching trainer info:', err);
                setError('Failed to load trainer information');
                setLoading(false);
            }
        };

        fetchTrainerInfo();
    }, [isAuthorized]);

    const handleNavigateToProfile = () => {
        // Add extra safeguard to make sure we have valid ID
        if (trainer && trainer.id) {
            navigate(`/trainer/profile/${trainer.id}`);
        } else {
            console.error('Cannot navigate: trainer ID is undefined');
        }
    };

    if (loading) {
        return (
            <div className="trainer-info-tile">
                <div className="loading">Loading trainer information...</div>
            </div>
        );
    }

    if (error || !trainer) {
        return (
            <div className="trainer-info-tile">
                <div className="error">{error || "No trainer information available"}</div>
            </div>
        );
    }

    return (
        <div className="trainer-info-tile">
            {/* Trainer header with avatar and info */}
            <div className="trainer-header">
                <div className="trainer-avatar-container">
                    {trainer.avatarPhoto ? (
                        <img src={trainer.avatarPhoto} alt="Avatar" className="trainer-avatar" />
                    ) : (
                        <div className="trainer-avatar-placeholder">
                            <FaUser size={30} />
                        </div>
                    )}
                </div>
                <div className="trainer-details">
                    <h4 className="trainer-name">{trainer.name} {trainer.lastName}</h4>
                    <div className="trainer-rating">
                        <FaStar className="text-warning me-1" />
                        <span>{trainer.rating}</span>
                    </div>
                    <p className="trainer-location">{trainer.city}, {trainer.country}</p>
                    <p className="trainer-sport">Sport: {trainer.sportType}</p>
                </div>
            </div>

            {/* View Profile Button */}
            <button 
                className="view-profile-btn"
                onClick={handleNavigateToProfile}
            >
                View Full Profile
            </button>

            {/* Recent Reviews Section */}
            <div className="recent-reviews">
                <h5>Recent Reviews</h5>
                {reviews.length > 0 ? (
                    <div className="reviews-container">
                        {reviews.map(review => (
                            <div key={review.id} className="review-card">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h6>{review.userName}</h6>
                                        <p className="small text-muted mb-0">
                                            <FaStar className="text-warning me-1" />
                                            {review.rating}
                                        </p>
                                    </div>
                                    <small className="text-muted">
                                        <FaCalendarAlt className="me-1" />
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </small>
                                </div>
                                <p className="mb-0">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="empty-state">No reviews yet</p>
                )}
            </div>
        </div>
    );
};

export default TrainerInfoTile;
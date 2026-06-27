// import "./SlotContainer.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaClock, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const SlotContainer = ({ 
    slots, 
    onAction, 
    actionType, 
    canNavigateToTrainer = false,
    isTrainerView = false,
    currentWeekStart,
    onPrevWeek,
    onNextWeek
}) => {
    const navigate = useNavigate();

    const handleTrainerClick = (trainerId) => {
        if (canNavigateToTrainer && trainerId) {
            navigate(`/trainer/profile/${trainerId}`);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };

    return (
        <div className="slots-container">
            {slots.length > 0 ? (
                slots.map(slot => (
                    <div key={slot.id} className="slot-card bg-white rounded p-4 mb-3 w-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h5 className="mb-2">{formatDate(slot.startTime)}</h5>
                                <p className="mb-1 d-flex align-items-center">
                                    <FaClock className="me-2" />
                                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                </p>
                                <p className="mb-1">
                                    <strong>Duration:</strong> {slot.duration} minutes
                                </p>
                                {!isTrainerView && slot.trainerName && (
                                    <p className="mb-2 d-flex align-items-center">
                                        <FaUser className="me-2" />
                                        Trainer: 
                                        <span 
                                            className={canNavigateToTrainer ? "trainer-link ms-1" : "ms-1"}
                                            onClick={() => handleTrainerClick(slot.trainerId)}
                                        >
                                            {slot.trainerName}
                                        </span>
                                    </p>
                                )}
                                {isTrainerView && slot.userName && (
                                    <p className="mb-2 d-flex align-items-center">
                                        <FaUser className="me-2" />
                                        Booked by: {slot.userName}
                                    </p>
                                )}
                            </div>
                            <button 
                                className={`btn btn-${actionType === 'cancel' ? 'danger' : 'outline-danger'} d-flex align-items-center`}
                                onClick={() => onAction(slot.id)}
                            >
                                {actionType === 'cancel' ? 'Cancel' : 'Remove'}
                                {actionType === 'remove' && <FaChevronRight className="ms-2" />}
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-5">
                    <p className="text-muted">
                        {isTrainerView ? "You have no available slots" : "You have no upcoming appointments"}
                    </p>
                </div>
            )}
            
            {currentWeekStart && (
                <div className="week-navigation d-flex justify-content-center align-items-center mt-3">
                    <button 
                        className="btn btn-outline-secondary me-3 d-flex align-items-center"
                        onClick={onPrevWeek}
                    >
                        <FaChevronLeft className="me-2" /> Previous
                    </button>
                    <button 
                        className="btn btn-outline-secondary d-flex align-items-center"
                        onClick={onNextWeek}
                    >
                        Next Week <FaChevronRight className="ms-2" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SlotContainer;
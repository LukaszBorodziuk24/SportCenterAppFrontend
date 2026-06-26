import "./SlotList.css";
import { useNavigate } from "react-router-dom";

const SlotList = ({ 
    slots, 
    onAction, 
    actionType, 
    canNavigateToTrainer = false,
    isTrainerView = false 
}) => {
    const navigate = useNavigate();

    const handleTrainerClick = (trainerId) => {
        if (canNavigateToTrainer && trainerId) {
            navigate(`/trainer/profile/${trainerId}`);
        }
    };

    return (
        <div className="slots-list">
            {slots.length > 0 ? (
                slots.map(slot => (
                    <div key={slot.id} className="slot-card bg-white rounded p-3 mb-3 w-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{slot.date} at {slot.time}</h5>
                                <p className="mb-1">Duration: {slot.duration}</p>
                                {!isTrainerView && slot.trainerName && (
                                    <p className="mb-2">
                                        Trainer: 
                                        <span 
                                            className={canNavigateToTrainer ? "trainer-link" : ""}
                                            onClick={() => handleTrainerClick(slot.trainerId)}
                                        >
                                            {slot.trainerName}
                                        </span>
                                    </p>
                                )}
                                {isTrainerView && slot.userName && (
                                    <p className="mb-2">Booked by: {slot.userName}</p>
                                )}
                            </div>
                            <button 
                                className={`btn btn-${actionType === 'cancel' ? 'danger' : 'outline-danger'}`}
                                onClick={() => onAction(slot.id)}
                            >
                                {actionType === 'cancel' ? 'Cancel' : 'Remove'}
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center mt-4">
                    {isTrainerView ? "You have no available slots" : "You have no upcoming appointments"}
                </p>
            )}
        </div>
    );
};

export default SlotList;
import "./TrainerPage.css";
import { useState } from "react";

const TrainerSlotsTile = () => {
    // This is a placeholder for the trainer slots functionality
    const [slots] = useState([
        {
            id: 1,
            date: "2023-12-15",
            time: "10:00 AM",
            duration: "60 min"
        },
        {
            id: 2,
            date: "2023-12-18", 
            time: "2:00 PM",
            duration: "45 min"
        }
    ]);

    return (
        <div className="trainer-slots-tile">
            <h3 className="mt-4 mb-4">My Training Slots</h3>
            
            {slots.length > 0 ? (
                <div className="slots-list">
                    {slots.map(slot => (
                        <div key={slot.id} className="slot-card bg-white rounded p-3 mb-3 w-100">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{slot.date} at {slot.time}</h5>
                                    <p className="mb-2">Duration: {slot.duration}</p>
                                </div>
                                <button className="btn btn-danger">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center mt-4">You have no available slots</p>
            )}
        </div>
    );
};

export default TrainerSlotsTile;
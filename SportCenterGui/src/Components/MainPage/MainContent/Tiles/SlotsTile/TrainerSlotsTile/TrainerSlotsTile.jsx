import "./TrainerSlotsTile.css";
import { useState } from "react";
import SlotList from "../SlotList/SlotList.jsx";

const TrainerSlotsTile = () => {
    // Mock data - this would be replaced with real API calls
    const [slots] = useState([
        {
            id: "1",
            date: "2023-12-15",
            time: "10:00 AM",
            duration: "60 min",
            userName: "Alice Brown"
        },
        {
            id: "2",
            date: "2023-12-18", 
            time: "2:00 PM",
            duration: "45 min",
            userName: "Bob Wilson"
        }
    ]);

    const handleRemoveSlot = (slotId) => {
        // Placeholder for remove slot logic
        console.log(`Removing slot ${slotId}`);
        // In real implementation, make API call to remove slot
    };

    return (
        <div className="trainerSlotsTile d-flex flex-column align-items-center justify-content-between h-100">
            <div className="w-100 h-100">
                <h3 className="mt-4 mb-4">My Training Slots</h3>
                
                <SlotList 
                    slots={slots}
                    onAction={handleRemoveSlot}
                    actionType="remove"
                    canNavigateToTrainer={false}
                    isTrainerView={true}
                />
            </div>
        </div>
    );
};

export default TrainerSlotsTile;
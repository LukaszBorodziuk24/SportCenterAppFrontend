import "./SlotsTile.css";
import { useState } from "react";
import UserSlotsTile from "./UserSlotsTile/UserSlotsTile.jsx";
import TrainerSlotsTile from "./TrainerSlotsTile/TrainerSlotsTile.jsx";

const SlotsTile = () => {
    // Placeholder for user role check - this would be replaced with actual auth logic
    const [isUserTrainer] = useState(false); // This should be replaced with real authentication check

    return (
        <div className="slotsTile d-flex flex-column align-items-center justify-content-between h-100">
            <div className="w-100 h-100">
                {isUserTrainer ? (
                    <TrainerSlotsTile />
                ) : (
                    <UserSlotsTile />
                )}
            </div>
        </div>
    );
};

export default SlotsTile;
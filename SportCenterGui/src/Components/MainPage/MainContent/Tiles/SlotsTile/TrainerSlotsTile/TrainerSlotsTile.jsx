import "./TrainerSlotsTile.css";
import { useState, useEffect } from "react";
import SlotContainer from "../SlotContainer/SlotContainer.jsx";
import { calendarAPI } from "../../../../../../services/api.js";
import { trainerAPI } from "../../../../../../services/api.js";

const TrainerSlotsTile = () => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

    const fetchTrainerSlots = async () => {
        try {
            setLoading(true);
            // Get the authenticated user ID (this would come from authentication context)

            const userId = await trainerAPI.getTrainerId();
            console.log(userId);
            
            if (!userId) {
                throw new Error('User not authenticated');
            }

            // Calculate the start and end dates for the current week
            const startDate = new Date(currentWeekStart);
            startDate.setDate(startDate.getDate() - startDate.getDay()); // Start of week (Sunday)
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 7); // End of week (Saturday)
            
            // Call the API to get training slots for this trainer
            const trainerSlots = await calendarAPI.getTrainingSlots(userId, { 
                startDate: startDate.toISOString(), 
                endDate: endDate.toISOString() 
            });
            
            setSlots(trainerSlots);
            setLoading(false);
        } catch (err) {
            setError("Failed to load training slots");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainerSlots();
    }, [currentWeekStart]);

    const handleRemoveSlot = async (slotId) => {
        try {
            // Call the delete training slot API
            await calendarAPI.deleteTrainingSlot(slotId);
            // Remove slot from local state after successful deletion
            setSlots(slots.filter(slot => slot.id !== slotId));
        } catch (error) {
            console.error('Error removing slot:', error);
        }
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentWeekStart);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setCurrentWeekStart(nextWeek);
    };

    const handlePrevWeek = () => {
        const prevWeek = new Date(currentWeekStart);
        prevWeek.setDate(prevWeek.getDate() - 7);
        setCurrentWeekStart(prevWeek);
    };

    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error) return <div className="text-center mt-4 text-danger">{error}</div>;

    return (
        <div className="trainerSlotsTile d-flex flex-column align-items-center justify-content-between h-100">
            <div className="w-100 h-100">
                <h3 className="mt-4 mb-4">My Training Slots</h3>
                
                <SlotContainer 
                    slots={slots}
                    onAction={handleRemoveSlot}
                    actionType="remove"
                    canNavigateToTrainer={false}
                    isTrainerView={true}
                    currentWeekStart={currentWeekStart}
                    onPrevWeek={handlePrevWeek}
                    onNextWeek={handleNextWeek}
                />
            </div>
        </div>
    );
};

export default TrainerSlotsTile;
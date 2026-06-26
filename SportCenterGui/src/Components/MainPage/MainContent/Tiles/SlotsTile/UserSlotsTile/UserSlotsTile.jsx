import "./UserSlotsTile.css";
import { useState, useEffect } from "react";
import SlotList from "../SlotList/SlotList.jsx";
import { calendarAPI } from "../../../../../../services/api.js";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const UserSlotsTile = () => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

    const fetchUserReservations = async () => {
        try {
            setLoading(true);
            // Calculate the start and end dates for the current week
            const startDate = new Date(currentWeekStart);
            startDate.setDate(startDate.getDate() - startDate.getDay()); // Start of week (Sunday)
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 7); // End of week (Saturday)
            
            // Call the API with date range parameters
            const reservations = await calendarAPI.getMyReservations({ 
                startDate: startDate.toISOString(), 
                endDate: endDate.toISOString() 
            });
            
            setSlots(reservations);
            setLoading(false);
        } catch (err) {
            setError("Failed to load reservations");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserReservations();
    }, [currentWeekStart]);

    const handleCancelReservation = async (slotId) => {
        try {
            // Call the delete reservation API
            await calendarAPI.deleteReservation(slotId);
            // Remove slot from local state after successful deletion
            setSlots(slots.filter(slot => slot.id !== slotId));
        } catch (error) {
            console.error('Error cancelling reservation:', error);
        }
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentWeekStart);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setCurrentWeekStart(nextWeek);
        console.log(`Moving to next week: ${nextWeek.toDateString()}`);
    };

    const handlePrevWeek = () => {
        const prevWeek = new Date(currentWeekStart);
        prevWeek.setDate(prevWeek.getDate() - 7);
        setCurrentWeekStart(prevWeek);
        console.log(`Moving to previous week: ${prevWeek.toDateString()}`);
    };

    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error) return <div className="text-center mt-4 text-danger">{error}</div>;

    return (
        <div className="userSlotsTile d-flex flex-column align-items-center justify-content-between h-100">
            <div className="w-100 h-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="mt-4 mb-4">My Appointments</h3>
                </div>
                <div className="text-center mb-3">
                    <p>Showing reservations for: {currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                
                <SlotList 
                    slots={slots}
                    onAction={handleCancelReservation}
                    actionType="cancel"
                    canNavigateToTrainer={true}
                    isTrainerView={false}
                />
            </div>
            <div className="week-navigation-bottom d-flex justify-content-center align-items-center mt-3">
                <button className="btn btn-outline-secondary me-3" onClick={handlePrevWeek}>
                    <FaChevronLeft /> Previous Week
                </button>
                <button className="btn btn-outline-secondary" onClick={handleNextWeek}>
                    Next Week <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default UserSlotsTile;
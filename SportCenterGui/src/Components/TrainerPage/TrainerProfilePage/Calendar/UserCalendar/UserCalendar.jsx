import { useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import CommonCalendar from "../CommonCalendar/CommonCalendar";
import { useAuth } from "../../../../../contexts/AuthContext";
import { calendarAPI } from "../../../../../services/api";

const UserCalendar = ({ trainerId }) => {
  const { isAuthorized, isCurrentUser } = useAuth();
  
  const [events, setEvents] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchTrainingSlots = useCallback(async (startDate, endDate) => {
    try {
      const slots = await calendarAPI.getTrainingSlots(trainerId, {
        startDate: startDate || new Date().toISOString(),
        endDate: endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });
      
      const formattedEvents = slots.map(slot => {
        const isReserved = slot.reservedByUserId !== null && slot.reservedByUserId !== undefined && slot.reservedByUserId !== "";
        const isMyReservation = slot.reservedByUserId && isCurrentUser(slot.reservedByUserId);
        
        let backgroundColor;
        let title;
        
        if (!isReserved) {
          backgroundColor = "#28a745";
          title = slot.description || "Available slot";
        } else if (isMyReservation) {
          backgroundColor = "#007bff";
          title = "Your reservation";
        } else {
          backgroundColor = "#dc3545";
          title = "Reserved";
        }
        
        return {
          id: slot.id,
          title: title,
          start: slot.startTime,
          end: slot.endTime,
          backgroundColor: backgroundColor,
          textColor: "#fff",
          extendedProps: {
            status: isReserved ? "booked" : "available",
            ownerId: slot.ownerId,
            reservedBy: slot.reservedByUserId,
            isAvailable: !isReserved,
            isMyReservation: isMyReservation
          }
        };
      });
      
      setEvents(formattedEvents);
    } catch (error) {
      setEvents([]);
    }
  }, [trainerId, isCurrentUser]);

  const handleDatesChange = useCallback((dateInfo) => {
    fetchTrainingSlots(dateInfo.start, dateInfo.end);
  }, [fetchTrainingSlots]);


  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    
    if (!isAuthorized) {
      alert("Please log in to manage reservations");
      return;
    }
    
    if (event.extendedProps.status === "booked" && !event.extendedProps.isMyReservation) {
      alert("This slot is reserved by another user");
      return;
    }
    
    setSelectedEvent(event);
    setShowBookingModal(true);
  };

  const handleBookSlot = async () => {
    if (!selectedEvent) return;
    
    const slotId = selectedEvent.id;
    const isCurrentlyBooked = selectedEvent.extendedProps.status === "booked";
    
    try {
      if (isCurrentlyBooked) {
        await calendarAPI.deleteReservation(slotId);
        
        setEvents(prev => prev.map(event => 
          event.id === selectedEvent.id 
            ? {
                ...event,
                title: selectedEvent.extendedProps.originalTitle || "Available slot",
                backgroundColor: "#28a745",
                extendedProps: { 
                  ...event.extendedProps,
                  status: "available",
                  isAvailable: true,
                  reservedBy: null,
                  isMyReservation: false
                }
              }
            : event
        ));
        
      } else {
        await calendarAPI.createReservation(slotId);
        
        setEvents(prev => prev.map(event => 
          event.id === selectedEvent.id 
            ? {
                ...event,
                title: "Twoja rezerwacja",
                backgroundColor: "#007bff",
                extendedProps: { 
                  ...event.extendedProps,
                  status: "booked",
                  isAvailable: false,
                  originalTitle: event.title,
                  isMyReservation: true
                }
              }
            : event
        ));
      }
      
    } catch (error) {
      alert("An error occurred while processing the reservation. Please try again.");
    }
    
    setShowBookingModal(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <CommonCalendar
        events={events}
        onEventClick={handleEventClick}
        onDatesChange={handleDatesChange}
        selectable={false}
        editable={false}
      />

      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEvent?.extendedProps?.status === "booked" ? "Cancel Your Reservation" : "Book Training Slot"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <p><strong>Date:</strong> {new Date(selectedEvent.start).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(selectedEvent.start).toLocaleTimeString()} - {new Date(selectedEvent.end).toLocaleTimeString()}</p>
              <p>
                {selectedEvent.extendedProps.status === "booked" 
                  ? "Do you want to cancel this reservation?" 
                  : "Do you want to book this training slot?"
                }
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
            Cancel
          </Button>
          <Button 
            variant={selectedEvent?.extendedProps?.status === "booked" ? "danger" : "primary"} 
            onClick={handleBookSlot}
          >
            {selectedEvent?.extendedProps?.status === "booked" ? "Cancel Reservation" : "Book Now"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UserCalendar.propTypes = {
  trainerId: PropTypes.string.isRequired
};

export default UserCalendar;
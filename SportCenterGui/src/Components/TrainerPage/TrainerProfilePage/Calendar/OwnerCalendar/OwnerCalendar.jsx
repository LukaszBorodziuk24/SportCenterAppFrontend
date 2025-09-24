import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import CommonCalendar from "../CommonCalendar/CommonCalendar";
import QuickSlotModal from "./QuickSlotModal/QuickSlotModal";
import ManualSlotModal from "./ManualSlotModal/ManualSlotModal";
import { calendarAPI } from "../../../../../services/api";

const OwnerCalendar = ({ trainerId }) => {
  const [events, setEvents] = useState([]);
  const [showQuickModal, setShowQuickModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [quickSlotData, setQuickSlotData] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [currentDateRange, setCurrentDateRange] = useState(null);

  const fetchTrainingSlots = useCallback(async (startDate, endDate) => {
    try {
      const slots = await calendarAPI.getTrainingSlots(trainerId, {
        startDate: startDate || new Date().toISOString(),
        endDate: endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });
      
      const formattedEvents = slots.map(slot => {
        const isReserved = slot.reservedByUserId !== null && slot.reservedByUserId !== undefined && slot.reservedByUserId !== "";
        
        return {
          id: slot.id,
          title: isReserved ? "Reserved" : (slot.description || "Available slot"),
          start: slot.startTime,
          end: slot.endTime,
          backgroundColor: isReserved ? "#dc3545" : "#28a745",
          textColor: "#fff"
        };
      });
      
      setEvents(formattedEvents);
    } catch (error) {
      setEvents([]);
    }
  }, [trainerId]);

  const handleDatesChange = useCallback((dateInfo) => {
    setCurrentDateRange(dateInfo);
    fetchTrainingSlots(dateInfo.start, dateInfo.end);
  }, [fetchTrainingSlots]);

  const handleDateClick = (info) => {
    const clickedDate = new Date(info.date);
    const endDate = new Date(clickedDate.getTime() + 30 * 60 * 1000); // Add 30 minutes
    
    setQuickSlotData({
      start: clickedDate.toISOString(),
      end: endDate.toISOString()
    });
    setShowQuickModal(true);
  };

  const handleSelect = (selectInfo) => {
    setQuickSlotData({
      start: selectInfo.startStr,
      end: selectInfo.endStr
    });
    setShowQuickModal(true);
  };

  const handleEventClick = (clickInfo) => {
    if (clickInfo.event.backgroundColor === "#dc3545") {
      alert("Cannot delete reserved slot. Wait for the user to cancel the reservation.");
      return;
    }
    
    if (window.confirm(`Delete slot: ${clickInfo.event.title}?`)) {
      setEvents(prev => prev.filter(event => event.id !== clickInfo.event.id));
      
      calendarAPI.deleteTrainingSlot(clickInfo.event.id)
        .then(() => {
          alert("Slot has been successfully deleted.");
        })
        .catch(() => {
          alert("Error deleting slot. Please try again.");
        });
    }
  };

  const handleSlotCreate = async (newSlot) => {
    try {
      const slotData = {
        ownerId: trainerId,
        startTime: newSlot.start,
        endTime: newSlot.end,
        description: newSlot.title
      };

      await calendarAPI.createTrainingSlot(slotData);

      if (currentDateRange) {
        await fetchTrainingSlots(currentDateRange.start, currentDateRange.end);
      } else {
        await fetchTrainingSlots();
      }
    } catch (error) {
      alert("Error creating slot. Please try again.");
    }
  };

  const handleAddSlotClick = () => {
    setShowManualModal(true);
  };

  const handleViewChange = (viewType, date) => {
    setCurrentView(viewType);
    setCurrentDate(date);
  };

  const additionalButtons = {
    addSlot: {
      text: "Add Slot",
      click: handleAddSlotClick
    }
  };

  return (
    <>
      <CommonCalendar
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
        onSelect={handleSelect}
        onViewChange={handleViewChange}
        onDatesChange={handleDatesChange}
        selectable={true}
        editable={true}
        additionalButtons={additionalButtons}
        headerToolbarRight="addSlot"
      />

      <QuickSlotModal
        show={showQuickModal}
        onHide={() => setShowQuickModal(false)}
        slotData={quickSlotData}
        currentDate={currentDate}
        onCreateSlot={handleSlotCreate}
      />

      <ManualSlotModal
        show={showManualModal}
        onHide={() => setShowManualModal(false)}
        defaultDate={currentDate}
        isInDayView={currentView === "timeGridDay"}
        onCreateSlot={handleSlotCreate}
      />
    </>
  );
};

OwnerCalendar.propTypes = {
  trainerId: PropTypes.string.isRequired
};

export default OwnerCalendar;
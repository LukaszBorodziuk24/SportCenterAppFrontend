import "../Calendar.css";
import React, { useRef, useState } from "react";
import { Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CommonCalendar = ({ 
  events,
  onDateClick,
  onEventClick,
  onSelect,
  onViewChange,
  onDatesChange,
  selectable = false,
  editable = false,
  additionalButtons = {},
  headerToolbarRight = ""
}) => {
  const calendarRef = useRef(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const handleDateClickUniversal = (info) => {
    let calendarApi = calendarRef.current.getApi();
    const realTimeViewType = calendarApi.view.type;
    
    
    if (realTimeViewType === "dayGridMonth") {
      calendarApi.changeView("timeGridDay", info.dateStr);
      if (onViewChange) {
        onViewChange("timeGridDay", info.dateStr);
      }
      return; // STOP HERE
    }
    
    if (realTimeViewType === "timeGridDay") {
      if (onDateClick) {
        onDateClick(info);
      }
      return;
    }
  };

  const handleSelectUniversal = (selectInfo) => {
    let calendarApi = calendarRef.current.getApi();
    const realTimeViewType = calendarApi.view.type;
    

    
    if (realTimeViewType === "dayGridMonth") {
      calendarApi.unselect();
      return; // STOP HERE - no modal in month view
    }
    
    if (realTimeViewType === "timeGridDay") {
      if (onSelect) {
        onSelect(selectInfo);
      }
      return;
    }
  };

  const handleViewDidMount = (arg) => {
    setCurrentView(arg.view.type);
    if (onViewChange) {
      onViewChange(arg.view.type, null);
    }
  };

  const handleDatesSet = (arg) => {
    setCurrentView(arg.view.type);
    
    if (onDatesChange) {
      const startDate = arg.start.toISOString();
      const endDate = arg.end.toISOString();
      onDatesChange({
        start: startDate,
        end: endDate,
        view: arg.view.type
      });
    }
  };

  const handleGoBack = () => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView("dayGridMonth");
    setCurrentView("dayGridMonth");
    if (onViewChange) {
      onViewChange("dayGridMonth", null);
    }
  };

  const headerToolbar = currentView === "timeGridDay"
    ? {
        left: "prev,next",
        center: "title",
        right: `goBackToMonth ${headerToolbarRight}`.trim()
      }
    : {
        left: "prev,next",
        center: "title",
        right: headerToolbarRight
      };

  return (
    <Card className="border-0 rounded-4 shadow-sm blurBg flex-grow-1 w-100">
      <Card.Body className="d-flex flex-column flex-grow-1">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          customButtons={{
            goBackToMonth: {
              text: "← Back to Month",
              click: handleGoBack,
            },
            ...additionalButtons
          }}
          headerToolbar={headerToolbar}
          height="100%"
          contentHeight="100%"
          expandRows={true}
          selectable={selectable}
          editable={editable}
          selectMirror={selectable}
          allDaySlot={false}
          dateClick={handleDateClickUniversal}
          eventClick={onEventClick}
          select={handleSelectUniversal}
          viewDidMount={handleViewDidMount}
          datesSet={handleDatesSet}
          events={events}
        />
      </Card.Body>
    </Card>
  );
};

export default CommonCalendar;
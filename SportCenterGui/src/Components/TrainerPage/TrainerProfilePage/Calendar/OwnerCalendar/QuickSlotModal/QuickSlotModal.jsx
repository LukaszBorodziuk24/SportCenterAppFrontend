import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const QuickSlotModal = ({ show, onHide, slotData, onCreateSlot, currentDate }) => {
  const [slotTitle, setSlotTitle] = useState("Available slot");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (slotData) {
      setSlotTitle("Available slot");
      
      const startDateTime = new Date(slotData.start);
      setStartTime(startDateTime.toTimeString().slice(0, 5));
      
      const endDateTime = new Date(slotData.end);
      setEndTime(endDateTime.toTimeString().slice(0, 5));
    }
  }, [slotData]);

  const handleCreate = () => {
    if (!startTime || !endTime || !slotTitle.trim() || !currentDate) {
      alert("Please fill in all fields");
      return;
    }

    const startDateTime = `${currentDate}T${startTime}:00`;
    const endDateTime = `${currentDate}T${endTime}:00`;
    
    if (new Date(startDateTime) >= new Date(endDateTime)) {
      alert("End time must be after start time");
      return;
    }

    const newSlot = {
      id: Date.now().toString(),
      title: slotTitle,
      start: startDateTime,
      end: endDateTime,
      backgroundColor: "#28a745",
      textColor: "#fff"
    };

    onCreateSlot(newSlot);
    onHide();
    
    setSlotTitle("Available slot");
    setStartTime("");
    setEndTime("");
  };

  const handleCancel = () => {
    onHide();
    setSlotTitle("Available slot");
    setStartTime("");
    setEndTime("");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    handleCreate();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('pl-PL', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long',
      day: 'numeric' 
    });
  };

  return (
    <Modal show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Create Available Slot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {currentDate && (
            <div className="mb-3 p-2 bg-light rounded">
              <strong>Date: </strong>{formatDate(currentDate)}
            </div>
          )}
          
          <Form.Group className="mb-3">
            <Form.Label>Slot Name</Form.Label>
            <Form.Control
              type="text"
              value={slotTitle}
              onChange={(e) => setSlotTitle(e.target.value)}
              placeholder="Enter slot name"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleCreate}>
          Create Slot
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuickSlotModal;
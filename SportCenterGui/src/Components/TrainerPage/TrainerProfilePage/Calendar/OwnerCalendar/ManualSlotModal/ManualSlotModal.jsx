import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ManualSlotModal = ({ show, onHide, defaultDate, onCreateSlot, isInDayView }) => {
  const [slotTitle, setSlotTitle] = useState("Available slot");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (isInDayView && defaultDate) {
      setDate(defaultDate);
    } else if (!isInDayView) {
      setDate("");
    }
  }, [defaultDate, isInDayView, show]);

  const handleCreate = () => {
    if (!date || !startTime || !endTime || !slotTitle.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const startDateTime = `${date}T${startTime}:00`;
    const endDateTime = `${date}T${endTime}:00`;
    
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
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  const handleCancel = () => {
    onHide();
    setSlotTitle("Available slot");
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    handleCreate();
  };

  return (
    <Modal show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Add Available Slot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder={isInDayView ? "Date from day view" : "Select date"}
            />
            {isInDayView && defaultDate && (
              <Form.Text className="text-muted">
                Default date set from day view
              </Form.Text>
            )}
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

export default ManualSlotModal;
import { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { trainerAPI } from "../../../services/api.js";

const BecomeTrainerModal = ({ show, onClose, onSuccess }) => {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [sportType, setSportType] = useState("");
    const [trainerPhoto, setTrainerPhoto] = useState(null);
    const [trainerAvatar, setTrainerAvatar] = useState(null);
    const [trainerBackground, setTrainerBackground] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const resetState = () => {
        setCity("");
        setCountry("");
        setSportType("");
        setTrainerPhoto(null);
        setTrainerAvatar(null);
        setTrainerBackground(null);
        setSubmitting(false);
        setError("");
    };

    const handleHide = () => {
        if (!submitting) {
            resetState();
            onClose && onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            await trainerAPI.becomeTrainer({
                city,
                country,
                sportType,
                trainerPhoto,
                trainerAvatar,
                trainerBackground,
            });
            resetState();
            onSuccess && onSuccess();
            onClose && onClose();
        } catch (err) {
            const msg = err?.response?.data?.message || "Submission failed";
            setError(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleHide} centered backdrop={submitting ? "static" : true}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton={!submitting} className="add-user-bg">
                    <Modal.Title>Become a Trainer</Modal.Title>
                </Modal.Header>
                <Modal.Body className="add-user-bg">
                    {error ? (<Alert variant="danger">{error}</Alert>) : null}
                    <Row className="g-3">
                        <Col xs={12}>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Enter your city"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Enter your country"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="sportType">
                                <Form.Label>Sport Type</Form.Label>
                                <Form.Select
                                    value={sportType}
                                    onChange={(e) => setSportType(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select sport</option>
                                    <option value="gym">Gym</option>
                                    <option value="kickboxing">Kickboxing</option>
                                    <option value="crossfit">Crossfit</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="trainerPhoto">
                                <Form.Label>Trainer Photo (listing)</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setTrainerPhoto(e.target.files?.[0] || null)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="trainerAvatar">
                                <Form.Label>Profile Avatar</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setTrainerAvatar(e.target.files?.[0] || null)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group controlId="trainerBackground">
                                <Form.Label>Profile Background</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setTrainerBackground(e.target.files?.[0] || null)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="add-user-bg">
                    <Button variant="secondary" onClick={handleHide} disabled={submitting}>Cancel</Button>
                    <Button type="submit" variant="primary" disabled={submitting}>
                        {submitting ? 'Submitting…' : 'Submit'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default BecomeTrainerModal;



import "./BecomeTrainerTile.css";
import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import BecomeTrainerModal from "../../../../../TrainerPage/BecomeTrainerModal/BecomeTrainerModal.jsx";

const BecomeTrainerTile = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="becomeTrainerTile d-flex flex-column align-items-center justify-content-between h-100">
                <Row className={"h-100 w-100"}>
                    <Col className={"col-12 d-flex flex-column justify-content-between text-center"}>
                        <p className={"h3 mt-4 mb-4 ms-3 me-3"}>Become a Trainer</p>
                        <p className="mb-4 ms-3 me-3 mt-5 description">
                            Join our community of professional trainers and start sharing your expertise with fitness enthusiasts.
                        </p>
                        <Button 
                            variant="primary" 
                            size="lg" 
                            onClick={() => setShowModal(true)}
                            className="btn-lg mb-4"
                        >
                            Become a Trainer
                        </Button>
                    </Col>
                </Row>
                
                <BecomeTrainerModal 
                    show={showModal} 
                    onClose={() => setShowModal(false)} 
                    onSuccess={() => setShowModal(false)}
                />
            </div>
        </>
    );
};

export default BecomeTrainerTile;
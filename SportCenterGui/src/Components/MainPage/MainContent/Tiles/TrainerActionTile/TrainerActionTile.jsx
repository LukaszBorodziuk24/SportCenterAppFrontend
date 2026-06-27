import "./TrainerActionTile.css";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import BecomeTrainerTile from "./BecomeTrainerTile/BecomeTrainerTile.jsx";
import TrainerInfoTile from "./TrainerInfoTile/TrainerInfoTile.jsx";

const TrainerTile = () => {
    // This will be replaced with actual isUserTrainer() function implementation
    const [isUserTrainer] = useState(true); // Placeholder for future implementation
    
    return (
        <div className="trainerActionTile d-flex flex-column align-items-center justify-content-between h-100">
            <Row className={"h-100 w-100"}>
                <Col className={"col-12 d-flex flex-column justify-content-between text-center"}>
                    {isUserTrainer ? (
                        <TrainerInfoTile />
                    ) : (
                        <BecomeTrainerTile />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default TrainerTile;
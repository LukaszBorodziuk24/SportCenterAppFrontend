
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import Calendar from "./Calendar/Calendar";
import ReviewSection from './ReviewSection/ReviewSection';
import NavbarComp from "../../Navbar/NavbarComp";
import { useParams, useLocation } from "react-router-dom";
import { getTrainerBg } from "../../../utils/getTrainerBg";
import "./TrainerProfilePage.css";
import { trainerAPI } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

const TrainerProfilePage = () => {
    const {id} = useParams();
    const location = useLocation();
    const initialTrainer = location.state?.user || {};
    const [trainer, setTrainer] = useState(initialTrainer);
    const { isCurrentUser } = useAuth();

    useEffect(() => {
        trainerAPI.getProfileDetails(id).then(apiData => {
            setTrainer(prev => ({
            ...prev,
            description: apiData.description,
            sportType: apiData.sportType,
            coverPhoto: apiData.coverPhoto,
            avatarPhoto: apiData.avatarPhoto
            }));
        });
    }, [id]);

    return (
        <div style={ getTrainerBg(trainer.sportType)}>
            <div style={{ height: "10vh", minHeight: 60 }}>
                <NavbarComp />
            </div>
            <Container fluid className="trainer-profile-main-container d-flex flex-column align-items-center px-0">
                <div className="trainer-profile-content">
                    <Card className="mb-4 shadow-lg border-0 rounded-4 text-light position-relative w-100 trainer-profile-card blurBg">
                        <Card.Img src={trainer.coverPhoto} alt="cover" className="trainer-cover-img" />
                        <Card.Body className="pt-0">
                            <Row className="align-items-end position-relative trainer-profile-row">
                                <Col xs="auto">
                                    <Image src={trainer.avatarPhoto} roundedCircle className="trainer-avatar-img" />
                                </Col>
                                <Col>
                                    <h2 className="mb-1">{trainer.name} {trainer.lastName}</h2>
                                    <div className="d-flex align-items-center gap-3 text-warning fw-semibold">
                                        <span>★ {trainer.rating}</span>
                                        <span className="text-light-emphasis">{trainer.city}, {trainer.country}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Row className="gy-4 align-items-stretch">
                        <Col md={5} className="d-flex">
                            <Card className="border-0 rounded-4 shadow-sm blurBg flex-grow-1">
                                <Card.Body className="d-flex flex-column flex-grow-1 about-me">
                                    <h4 className="fw-bold mb-2">About me</h4>
                                    <div className="flex-grow-1">{trainer.description}</div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={7} className="d-flex">
                            <Calendar isCurrentUser={isCurrentUser} trainerId={id} />
                        </Col>
                    </Row>
                </div>
                <div className="trainer-profile-comments-section expanded">
                    <ReviewSection trainerId={id} isCurrentUser={isCurrentUser(id)} />
                </div>
            </Container>
        </div>
    );
};

export default TrainerProfilePage;

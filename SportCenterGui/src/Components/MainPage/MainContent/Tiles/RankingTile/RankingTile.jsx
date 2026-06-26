import { FaTrophy, FaStar } from "react-icons/fa";
import "./RankingTile.css"
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

const RankingTile = ({reloadOnClose}) => {
    
    // Mock data for top trainers - this will be replaced with API call later
    const [topTrainers, setTopTrainers] = useState({
        kickboxing: [
            { id: 1, name: "John Smith", specialty: "Strength Training", rating: 4.8 },
            { id: 2, name: "Mike Johnson", specialty: "Boxing Techniques", rating: 4.7 },
            { id: 3, name: "David Wilson", specialty: "Martial Arts", rating: 4.9 },
            { id: 4, name: "Chris Brown", specialty: "Combat Sports", rating: 4.6 },
            { id: 5, name: "James Davis", specialty: "Kickboxing", rating: 4.8 }
        ],
        gym: [
            { id: 1, name: "Sarah Miller", specialty: "Strength Training", rating: 4.9 },
            { id: 2, name: "Lisa Anderson", specialty: "Bodybuilding", rating: 4.7 },
            { id: 3, name: "Jennifer Lee", specialty: "Weight Training", rating: 4.8 },
            { id: 4, name: "Amanda White", specialty: "Fitness Coaching", rating: 4.6 },
            { id: 5, name: "Rachel Green", specialty: "Muscle Building", rating: 4.9 }
        ],
        crossfit: [
            { id: 1, name: "Robert Taylor", specialty: "CrossFit Training", rating: 4.8 },
            { id: 2, name: "Thomas Moore", specialty: "Functional Fitness", rating: 4.7 },
            { id: 3, name: "Daniel Jackson", specialty: "WOD Coaching", rating: 4.9 },
            { id: 4, name: "Matthew Harris", specialty: "Metcon Training", rating: 4.6 },
            { id: 5, name: "Christopher Clark", specialty: "High Intensity", rating: 4.8 }
        ]
    });

    return (
        <>
            <div className={"rankingCustom d-flex flex-column align-items-center h-100"}>
                <Row className={"h-100 w-100"}>
                    <Col className={"col-12 d-flex flex-column justify-content-between text-center"}>
                        <p className={"h5 rankingTitle mt-2"}>Top Trainers</p>
                        <div className={"me-3 ms-3 pt-2 pb-2 align-items-center rankingIconWrapper"}>
                            <FaTrophy className={"rankingIcon"}/>
                        </div>
                        <div className="categories-container">
                            <Row className="g-2">
                                <Col md={4} className="category-column">
                                    <h6 className="category-title">Kickboxing</h6>
                                    {topTrainers.kickboxing.map((trainer, index) => (
                                        <div key={trainer.id} className="trainer-item d-flex justify-content-between align-items-center mb-2">
                                            <span className="trainer-position">{index + 1}</span>
                                            <span className="trainer-name">{trainer.name}</span>
                                            <div className="trainer-rating d-flex align-items-center">
                                                <FaStar className="star-icon" />
                                                <span className="rating-value">{trainer.rating}</span>
                                            </div>
                                        </div>
                                    ))}
                                </Col>
                                <Col md={4} className="category-column">
                                    <h6 className="category-title">Gym</h6>
                                    {topTrainers.gym.map((trainer, index) => (
                                        <div key={trainer.id} className="trainer-item d-flex justify-content-between align-items-center mb-2">
                                            <span className="trainer-position">{index + 1}</span>
                                            <span className="trainer-name">{trainer.name}</span>
                                            <div className="trainer-rating d-flex align-items-center">
                                                <FaStar className="star-icon" />
                                                <span className="rating-value">{trainer.rating}</span>
                                            </div>
                                        </div>
                                    ))}
                                </Col>
                                <Col md={4} className="category-column">
                                    <h6 className="category-title">Crossfit</h6>
                                    {topTrainers.crossfit.map((trainer, index) => (
                                        <div key={trainer.id} className="trainer-item d-flex justify-content-between align-items-center mb-2">
                                            <span className="trainer-position">{index + 1}</span>
                                            <span className="trainer-name">{trainer.name}</span>
                                            <div className="trainer-rating d-flex align-items-center">
                                                <FaStar className="star-icon" />
                                                <span className="rating-value">{trainer.rating}</span>
                                            </div>
                                        </div>
                                    ))}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default RankingTile
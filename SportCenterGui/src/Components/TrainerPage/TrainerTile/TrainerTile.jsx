import "./TrainerTile.css"
import { useNavigate } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import KickboxingBg from "@assets/test.jpg";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const TrainerTile = ({ user }) => {
    const navigate = useNavigate();
    const userPreview = {
        name: user.name,
        lastName: user.lastName,
        city: user.city,
        country: user.country,
    }
    const handleClick = () => {
        navigate(`/trainer/profile/${user.id}`, { state: { user: userPreview } });
    };
    return (
        <Card className={"trainerTile bg-transparent border-0 "} style={{ cursor: "pointer" }} onClick={handleClick}>
            <Card.Img
                src={KickboxingBg}
                className={"h-100 object-fit-cover rounded-5"}
            />
            <Card.ImgOverlay
                className={"d-flex justify-content-between align-items-end"}
            >
                <Col className={"position-relative"}>
                    <Card.Title>{user.name} {user.lastName}</Card.Title>
                    <Card.Text className={"d-flex align-items-center greyFont"} >
                        <FaLocationDot className={"me-2"}/> {user.city}, {user.country}
                    </Card.Text>
                    <FaHeart className={"heartIcon position-absolute end-0 bottom-0 me-2 mb-4"} />
                </Col>
            </Card.ImgOverlay>
        </Card>
    );
};

export default TrainerTile;
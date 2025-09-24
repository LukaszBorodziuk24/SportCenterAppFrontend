import DefaultBg from "@assets/trainerBg.svg";
import GymBg from "@assets/trainerGymBg.jpg";
import CrossfitBg from "@assets/trainerCrossfitBg.jpg";
import KickboxingBg from "@assets/trainerKickboxingBg.jpg";

export const getTrainerBg = (sport) => {
    const sportType = {
        gym: GymBg,
        crossfit: CrossfitBg,
        kickboxing: KickboxingBg,
        default: DefaultBg
    };
    const url = sportType[sport] || sportType.default;
    return {
        minHeight: "100vh",
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };
};
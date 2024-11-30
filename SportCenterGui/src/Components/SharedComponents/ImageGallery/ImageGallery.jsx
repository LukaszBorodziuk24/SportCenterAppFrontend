import "./ImageGallery.css"
import {useSpring, animated} from "@react-spring/web";
import {useEffect, useState} from "react";
import Bg1 from '@assets/crossfitMainBg.jpg'
import  Bg2 from '@assets/boxMainBg.jpg'
import  Bg3 from '@assets/gymMainBg.jpg'

const ImageGallery = () => {
    const [index, setIndex] = useState(0);

    const images = [
        Bg1,
        Bg2,
        Bg3,

    ];
    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        reset: true,
        config: { duration: 2000 },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [images.length]);



    return(
        <div className={"col-6 d-flex align-items-center justify-content-center"}>
            <animated.div
                style={{
                    ...props,
                    backgroundImage: `
                        url(${images[index]})
                    `,
                }}
            className={"imageGallery rounded-5 me-3"}>

            </animated.div>
        </div>
    )
}
export default ImageGallery
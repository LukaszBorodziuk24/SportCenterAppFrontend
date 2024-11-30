import "./LoginPage.css"
import ImageGallery from "../SharedComponents/ImageGallery/ImageGallery.jsx";
import LoginForm from "./LoginForm/LoginForm.jsx";


const LoginPage = () => {

    return(
        <div className={"authPageCustom row"}>
            <LoginForm/>
            <ImageGallery/>
        </div>
    )
}

export default LoginPage
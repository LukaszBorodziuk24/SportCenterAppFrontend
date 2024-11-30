import RegisterForm from "./RegisterForm/RegisterForm.jsx";
import "./RegisterPage.css"
import ImageGallery from "../SharedComponents/ImageGallery/ImageGallery.jsx";


const RegisterPage = () => {
    return(
        <div className={"authPageCustom row"}>
            <RegisterForm/>
            <ImageGallery/>
        </div>
    )
}
export default RegisterPage

import "./LoginForm.css"
import {Button, Col, Container, Form, FormGroup, InputGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import {useState} from "react";
import {FiEye, FiEyeOff} from "react-icons/fi";
import { useAuth } from "../../../contexts/AuthContext.jsx";


const LoginForm = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [showPassword,setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const [error, setError] = useState(null);


    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData(prevFormData =>({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        console.log(formData);

        const result = await login(formData);
        console.log(result.success);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.error);
        }
    };

    const handleNavigation= (link) =>{
        navigate(link)
    }

    return(
        <Container className={"col-6 d-flex vh-100 position-relative"}>
            <p className={"position-absolute top-0 start-0 m-3 logo"}>LOGO</p>
            <button
                className={"position-absolute top-0 end-0 m-4 transparentButton greyFont"}
                onClick={ ()=> handleNavigation("/")}><FaArrowLeft /> Go back</button>



            <Col className={"d-flex align-items-center justify-content-center w-100 flex-column"}>
                <p className={"h2"}>Welcome back</p>
                <p className={""}>Lorem ipsum dolor sit amet consectetur</p>
                <Form className={"d-flex flex-column gap-3 w-50"} onSubmit={handleSubmit}>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder={"Enter your email"}
                            name="email"
                            className={"rounded-3"}
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword?"text":"password"}
                                placeholder={"Enter your password"}
                                name={"password"}
                                className={"rounded-start-3"}
                                onChange={handleChange}
                                value={formData.password}
                            />
                            <InputGroup.Text
                                onClick={()=>setShowPassword(!showPassword)}
                                className={"iconEye rounded-end-3"}
                            >
                                {showPassword ? <FiEye /> : <FiEyeOff /> }
                            </InputGroup.Text>
                        </InputGroup>

                    </Form.Group>


                    <Button  className={"mt-3 rounded-3 border-0 p-2  mainAppButton submitButton"}
                             type={"submit"}
                    >Log In</Button>

                    <p className={"d-flex justify-content-center mb-0"}>OR</p>

                    <button className={"altAppButton rounded-3 p-2"}>Log In with Google</button>

                    <button
                        className={"transparentButton greyFont"}
                        onClick={()=> handleNavigation("/register")}
                    >Don’t have an account? Sign in</button>
                </Form>


            </Col>
        </Container>

    )
}

export default LoginForm
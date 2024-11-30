import {Button, Form, FormGroup, FormLabel, FormText, InputGroup} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./RegisterForm.css";
import { FiEyeOff, FiEye } from "react-icons/fi";
import {FaArrowLeft} from "react-icons/fa";

const RegisterForm = () => {
    const navigate = useNavigate();

    // Stan formularza
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
        console.log("test");
    };

    // refractor optimalization
        // const handleChange = useCallback(
        //     debounce((e) => {
        //         const { name, value } = e.target;
        //         setFormData((prevFormData) => ({
        //             ...prevFormData,
        //             [name]: value,
        //         }));
        //     }, 300),
        //     []
        // );

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch('https://localhost:7221/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
                })
            });

            if (response.ok) {
                console.log('Registration successful');
                handleNavigation("/login");
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleNavigation = (url) => {
        navigate(url);
    };

    return (
        <div className={"col-6 d-flex vh-100 position-relative"}>
            <p className={"position-absolute top-0 start-0 m-3 logo"}>LOGO</p>
            <button
                className={"position-absolute top-0 end-0 m-4 transparentButton greyFont"}
                onClick={() => handleNavigation("/")}
            >
                <FaArrowLeft /> Go back
            </button>

            <div className={"d-flex align-items-center justify-content-center w-100 flex-column"}>
                <p className={"h2"}>Create an account</p>
                <p className={""}>Lorem Ipsum is simply dummy text of the printing and</p>
                <Form className={"d-flex flex-column gap-3 w-50"} onSubmit={handleSubmit}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <FormGroup>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={"Enter your first name"}
                                    name="firstName"
                                    className={"rounded-3"}
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </div>

                        <div className={"col-6"}>
                            <FormGroup>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={"Enter your last name"}
                                    name="lastName"
                                    className={"rounded-3"}
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </div>
                    </div>

                    <FormGroup>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder={"Enter your email"}
                            name="email"
                            className={"rounded-3"}
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                name="password"
                                className={"rounded-start-3"}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <InputGroup.Text
                                onClick={() => setShowPassword(!showPassword)}

                                className={"iconEye rounded-end-3"}
                            >
                                {showPassword ? <FiEye /> : <FiEyeOff /> }
                            </InputGroup.Text>
                        </InputGroup>
                    </FormGroup>


                    <FormGroup>
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showConfirmPassword?"text":"password"}
                                placeholder={"Confirm your password"}
                                name="confirmPassword"
                                className={"rounded-start-3"}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.confirmPassword}
                            />

                            <InputGroup.Text
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className={"iconEye rounded-end-3"}
                            >
                                {showConfirmPassword ? <FiEye /> : <FiEyeOff /> }
                            </InputGroup.Text>
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                        </Form.Control.Feedback>
                    </FormGroup>

                    <Button className={"mt-3 rounded-3 border-0 p-2 mainAppButton"} type={"submit"}>
                        Create Account
                    </Button>

                    <p className={"d-flex justify-content-center mb-0"}>OR</p>

                    <button className={"altAppButton rounded-3 p-2"}>Sign up with Google</button>

                    <button
                        className={"transparentButton greyFont"}
                        onClick={() => handleNavigation("/login")}
                    >
                        Already have an account? Log in
                    </button>
                </Form>
            </div>
        </div>
    );
};

export default RegisterForm;

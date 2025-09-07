import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage.jsx";
import RegisterPage from "./Components/RegisterPage/RegisterPage.jsx";
import LoginPage from "./Components/LoginPage/LoginPage.jsx";
import TrainerPage from "./Components/TrainerPage/TrainerPage.jsx";
import AdminPage from "./Components/AdminPage/AdminPage.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/trainer/:sport" element={<TrainerPage/>}/>
                    <Route path="/admin" element={<AdminPage/>}/>
                </Routes>
            </BrowserRouter>  
        </AuthProvider>


    )
}

export default App

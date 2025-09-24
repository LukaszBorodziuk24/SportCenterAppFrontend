import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage.jsx";
import RegisterPage from "./Components/RegisterPage/RegisterPage.jsx";
import LoginPage from "./Components/LoginPage/LoginPage.jsx";
import TrainerPage from "./Components/TrainerPage/TrainerPage.jsx";
import AdminPage from "./Components/AdminPage/AdminPage.jsx";
import AdminMainContent from "./Components/AdminPage/AdminPanel/AdminMainContent/AdminMainContent.jsx";
import RequestsPanel from "./Components/AdminPage/TrainerRequests/RequestsPanel/RequestsPanel.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import TrainerProfilePage from './Components/TrainerPage/TrainerProfilePage/TrainerProfilePage.jsx';
import AdminPanel from './Components/AdminPage/AdminPanel/AdminPanel.jsx';

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/trainer/:sport" element={<TrainerPage/>}/>
                    

                    <Route path="/admin" element={<AdminPage/>}>
                        <Route index element={<Navigate to="users" replace />} />
                        <Route path="users" element={<AdminPanel />} />
                        <Route path="requests" element={<RequestsPanel />} />
                    </Route>
                    <Route path="/trainer/profile/:id" element={<TrainerProfilePage/>}/>

                </Routes>
            </BrowserRouter>  
        </AuthProvider>


    )
}

export default App

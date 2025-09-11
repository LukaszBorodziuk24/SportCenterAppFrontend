import "./AdminPage.css"
import AdminSideBar from "./AdminSideBar/AdminSideBar.jsx";
import AdminPanel from "./AdminPanel/AdminPanel.jsx";
import { Outlet } from "react-router-dom";
import {Row} from "react-bootstrap";





const AdminPage = () =>{
    return(
        <div className={"adminBg"}>
            <Row>
                <div className={"col-2 p-0"}>
                    <AdminSideBar/>
                </div>

                <div className={"col-10 p-0 w-90"}>
                    <Outlet/>
                </div>
            </Row>
        </div>
    )
}
export default AdminPage
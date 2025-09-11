import "./AdminSideBar.css"
import { NavLink } from "react-router-dom";




const AdminSideBar = () => {

    return(
        <div className={"adminSidebarBg rounded-end-5 justify-content-start col-2 p-3"}>
            <div className="d-flex flex-column gap-2 mt-2">
                <NavLink to="/admin/users" className={({isActive}) => `adminNavLink ${isActive ? 'active' : ''}`}>
                    Users
                </NavLink>
                <NavLink to="/admin/requests" className={({isActive}) => `adminNavLink ${isActive ? 'active' : ''}`}>
                    Trainer Requests
                </NavLink>
            </div>
        </div>
    )
}
export default AdminSideBar
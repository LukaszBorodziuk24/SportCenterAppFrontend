import "./AdminPanel.css"
import AdminPageBanner from "./AdminPageBanner/AdminPageBanner.jsx";
import AdminMainContent from "./AdminMainContent/AdminMainContent.jsx";



const AdminPanel = () =>{
    return(
        <div className="adminPanelContainer mt-3">
            <AdminPageBanner title="Clients"/>
            <AdminMainContent/>
        </div>
    )
}
export default AdminPanel
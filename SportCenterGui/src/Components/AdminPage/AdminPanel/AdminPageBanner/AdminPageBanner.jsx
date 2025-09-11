import "./AdminPageBanner.css"
import GoBackBtn from "../../../SharedComponents/GoBackBtn/GoBackBtn.jsx";


const AdminPageBanner = ({ title = "Clients" }) =>{
    return(
        <div className="row align-items-center justify-content-between pageAdminBanner">
            <h1 className="col-10 text-white" >{title}</h1>
            <div className={"col-2 justify-content-end"}>
                <GoBackBtn backLink={"/"}/>
            </div>

        </div>

    )
}

export default AdminPageBanner
import { useState } from 'react';
import "./PanelBanner.css"
import SearchBar from "../../../../SharedComponents/SearchBar/SearchBar.jsx";
import AddUserForm from "../../AddUserForm/AddUserForm";

const PanelBanner = ({setFilterBy}) => {
    const [showModal, setShowModal] = useState(false);

    return(
        <>
            <div className="panelBannerBg d-flex justify-content-evenly align-items-center text-black p-3 m-2 rounded-5">
                <p className="col-3 m-0">Name</p>
                <p className="col-3 m-0">LastName</p>
                <p className="col-3 m-0">City</p>
                <div className="col-3 row m-0">
                    <button 
                        className="me-3 col-3 transparent-btn-addUser rounded-3"
                        onClick={() => setShowModal(true)}
                    >
                        Add User
                    </button>
                    <SearchBar setFilterBy={setFilterBy} style="col-8"/>
                </div>
            </div>

            <AddUserForm 
                show={showModal}
                handleClose={() => setShowModal(false)}
            />
        </>
    );
};

export default PanelBanner;
import MainContent from "./MainContent/MainContent.jsx";
import SportContent from "./SportContent/SportContent.jsx";
import NavbarComp from "../Navbar/NavbarComp.jsx";
import "./MainPage.css"


const MainPage = () =>{
    return(

        <div className="customBackground">
            <NavbarComp/>
            <div className={"overflow-auto container-fluid p-0"}>
                <MainContent/>
                <SportContent/>
            </div>
        </div>

    )
}

export default MainPage
import "./ExpandedTiles.css"
import ExpandedBmi from "./ExpandedBmi/ExpandedBmi.jsx";


const ExpandedTiles = ({ tile, onClose }) =>{



    const renderContent = () => {
        switch (tile) {
            case 'item1':
                return <p>This is expanded content for Item 1</p>;
            case 'item2':
                return <p>This is expanded content for Item 2</p>;
            case 'item3':
                return <p>This is expanded content for Item 3</p>;
            case 'item4':
                return <ExpandedBmi onClose={onClose}/>;
            default:
                return null;
        }
    };

    return (
        <>
            {renderContent()}
        </>
    );
}

export default ExpandedTiles
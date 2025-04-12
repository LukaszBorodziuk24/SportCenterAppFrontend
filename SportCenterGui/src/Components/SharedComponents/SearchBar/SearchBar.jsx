import "./SearchBar.css"
import {SlMagnifier} from "react-icons/sl";
import {Form, InputGroup} from "react-bootstrap";


const SearchBar = ({setFilterBy,style}) => {

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setFilterBy(e.target.value);
        }
    };
    return (
        <Form className={style}>
            <Form.Group>
                <InputGroup>
                    <InputGroup.Text className={"rounded-start-3"}>
                        <SlMagnifier/>
                    </InputGroup.Text>

                    <Form.Control
                        type={"text"}
                        placeholder={"Search"}
                        className={"rounded-end-3"}
                        onKeyDown={handleKeyDown}
                    />

                </InputGroup>

            </Form.Group>
        </Form>
    )
}

export default SearchBar
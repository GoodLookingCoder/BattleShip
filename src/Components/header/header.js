import logo from "./bs_logo.png"
import "./header.scss"

const header = () => {
    return (
        <div className="header">
            <img src={logo}/>
        </div>
    )
}

export default header

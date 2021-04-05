import logo from "./bs_logo.png"
import "./header.scss"

const header = ({stage}) => {
    return (
        <div className={`header ${stage==="start"&&"big"}`}>
            <img src={logo}/>
        </div>
    )
}

export default header

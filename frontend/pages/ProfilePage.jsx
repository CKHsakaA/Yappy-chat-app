import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
const ProfilePage = ()=>{
    return(
        <div>
            <div className="w-[15%]">
                <Navbar/>
            </div>
            <div className="w-[85%]">
                profile
            </div>
        </div>
    )
}

export default ProfilePage
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const Navbar = () => {
    const [user, setUser] = useState()

    const navigate = useNavigate();

    const fetchData = async () => {
        const data = await fetch("http://localhost:3000/api/auth/me", {
            method: "GET",
            credentials: 'include',
        })
        const res = await data.json()
        const userdata = res.user;
        console.log(res)
        setUser(userdata)
    }

    useEffect(() => {
        fetchData()
    }, [])



    const handleLogout = async () => {
        const logout = await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
            credentials: 'include',
        })
        const res = await logout.json()
        if (logout.ok) {
            console.log(res)
            navigate("/")
        }
    }

    const goProfile = () => {
        navigate(`/profile/${user._id}`)
    }

    return (
        <div className="h-screen bg-white justify-between shadow-xs flex flex-col w-full">
            <div className="w-full">
                <Link className="flex border-b border-gray-200 border-solid font-semibold gap-2 text-3xl hover:bg-gray-100 transition-all duration-400 p-4" to="/home">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-red-400">
                        <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clip-rule="evenodd" />
                    </svg>
                    <h1 className="text-red-400">Yappy</h1>
                </Link>
                <Link to="/home">
                    <div className="w-full flex gap-2 rounded-xs hover:bg-gray-200 transition-all duration-400 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0-7.605-4.185L3 21l4.185-1.395A8.958 8.958 0 0 0 12 21z" /></svg>
                        <h1 className="font-semibold text-xl">Chats</h1>
                    </div>
                </Link>


            </div>


            <div className="flex w-full flex-col gap-2 px-5 mb-5">
                <button onClick={handleLogout} className="bg-gray-500 text-white font-bold py-5 px-5 rounded-xl hover:bg-gray-400 transition-all duration-400 w-full">Logout</button>
                <div className="flex items-center gap-4 p-3 duration-300 transition-all">
                    <button onClick={goProfile}><img className="size-15 rounded-full border border-gray-400" src={user?.profileImg} alt="profile" /></button>
                </div>
            </div>
        </div>
    )
}

export default Navbar




// <Link to="/login">
// 
// </Link>

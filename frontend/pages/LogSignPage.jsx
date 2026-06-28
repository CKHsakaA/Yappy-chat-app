import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const LoginSignupPage = () => {
    const [userinfo, setuserInfo] = useState({
        "email": "",
        "password": "",
    })
    const navigate = useNavigate();

    const handleLogin = async () => {
        const log = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(userinfo)
        }
        )
        const res = await log.json()
        console.log(res)
        if (log.ok) {
            console.log('navigating')
            navigate('/home')
        }

    }


    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex justify-between gap-30">
                <div>
                    <div className="flex justify-between">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-50 text-red-400">
                            <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clip-rule="evenodd" />
                        </svg>
                        <h1 className="text-9xl text-red-400 font-semibold">Yappy</h1>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="font-semibold text-8xl text-red-400">Making every <br />chat count!</h1>
                    <h1 className="text-2xl font-semibold ">Log In</h1>
                    <input onChange={(e) => setuserInfo({ ...userinfo, email: e.target.value })} placeholder="Enter email" type="text" className="p-3 bg-gray-200 rounded-xl w-max"></input>
                    <input onChange={(e) => setuserInfo({ ...userinfo, password: e.target.value })} placeholder="Enter password" type="password" className="p-3 bg-gray-200 rounded-xl w-max "></input>
                    <button onClick={handleLogin} className="bg-red-400 rounded-xl p-3 font-semibold text-white w-55 hover:bg-red-500">Log In</button>

                    <h1>Don't have an account? <Link to="/signup" className="hover:underline text-blue-500">Sign up</Link></h1>
                </div>
            </div>
        </div>
    )
}

export default LoginSignupPage
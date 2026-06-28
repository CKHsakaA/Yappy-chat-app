import Navbar from "../components/Navbar.jsx"
import { useEffect, useState } from "react"
import { useRef } from "react"

const HomePage = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState()
    const [chattoggle, setChattoggle] = useState(false)
    const [messages, setMessages] = useState([])
    const [otheruser, setOtheruser] = useState()
    const [msgcontent, setMsgcontent] = useState()

    const fileInputRef = useRef(null)

    const handleButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleSendmsg = async () => {
        const send = await fetch(`http://localhost:3000/api/message/sendmsg/${otheruser._id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: msgcontent,
                img: ""
            }),
        })
        const res = await send.json()
        setMessages(prevMessages => [...prevMessages, res])
        setMsgcontent('')
        console.log(msgcontent)
        console.log(messages)
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("User selected file:", file);
        }
    };

    const fetchData = async () => {
        const data = await fetch("http://localhost:3000/api/auth/me", {
            method: "GET",
            credentials: 'include',
        })
        const res = await data.json()
        const userdata = res.user;
        setUser(userdata)
    }

    const getAll = async () => {
        const data = await fetch("http://localhost:3000/api/auth/getallusers", {
            credentials: "include",
        })
        const res = await data.json()
        console.log(res)

        if (data.ok) {
            setUsers(res)
            fetchData()
        }
    }

    const getOtheruser = async (chatid) => {
        const data = await fetch(`http://localhost:3000/api/auth/getinfo/${chatid}`)
        const res = await data.json()
        console.log(res)
        setOtheruser(res)
    }

    const getMsg = async (chatid) => {
        setChattoggle(true)
        getOtheruser(chatid)
        const data = await fetch(`http://localhost:3000/api/message/getmsg/${chatid}`, {
            method: "GET",
            credentials: "include",
        })
        const res = await data.json()
        console.log(res)
        setMessages(res)
    }

    useEffect(() => {
        getAll()
        fetchData()
    },[])

    useEffect(() => {
        console.log('Messages updated:', messages)
    }, [messages])


    return (
        <div className="flex h-screen">
            <div className="w-[12%] border border-r-gray-300">
                <Navbar />
            </div>
            <div className="w-[22%] border border-r-gray-300">
                <div className="my-5 flex flex-col gap-2 p-4">
                    <h1 className="font-semibold text-2xl">{user?.username}</h1>
                    <input type="text" placeholder="Search" className="border-gray-200 bg-gray-200 p-2 rounded-md"></input>
                </div>

                <div className="flex flex-col p-2">
                    <h1 className="font-semibold text-xl">Chats</h1>
                    {users.map(user => {
                        return (
                            <button key={user._id} onClick={() => getMsg(user?._id)} className="flex gap-4 hover:bg-gray-100 items-center transition-all duration-300 p-3 rounded-xl">
                                <img src={user?.profileImg} alt="pfp" className="rounded-full size-12" />
                                <h1 className="text-[18px]">{user?.fullName}</h1>
                            </button>
                        )
                    })}
                </div>


            </div>
            <div className={`w-[70%] px-1 flex flex-col h-screen ${!chattoggle ? "flex justify-center items-center" : ""}`}>
                {!chattoggle ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-15 text-gray-300">
                        <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clip-rule="evenodd" />
                    </svg>
                    :
                    <div className="w-full py-4 px-1 flex flex-col h-screen">
                        <div className="flex gap-5 p-3 w-full items-center border-b border-gray-200">
                            <img src={otheruser?.profileImg} alt="" className="rounded-full size-10" />
                            <h1 className="font-semibold text-xl">{otheruser?.fullName}</h1>
                        </div>
                        {/* --------------------middle---------------------------------------- */}
                        <div className="overflow-y-scroll h-full">
                            {messages.map(message => {
                                const isCurrentUser = message.sender === user?._id;
                                return (
                                    <div key={message._id} className={`text-xl p-2 my-1 mt-3 flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                                        {isCurrentUser ?
                                            <h1 className={`w-max rounded-xl p-2 flex ${isCurrentUser ? "justify-end bg-blue-500 text-white" : "justify-start bg-gray-300 text-black"}`}>{message.content}</h1>
                                            :
                                            <div className="flex gap-4">
                                                <img src={otheruser.profileImg} className="rounded-full size-10" />
                                                <h1 className={`w-max rounded-xl p-2 flex ${isCurrentUser ? "justify-end bg-blue-500 text-white" : "justify-start bg-gray-300 text-black"}`}>{message.content}</h1>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                        {/* -------------------------------------------------------{bottombar}--------- */}
                        <div className="p-3 flex items-center gap-5 w-full">
                            <button onClick={handleButtonClick}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-blue-500">
                                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                            </svg>
                            </button>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                            <input onChange={(e) => setMsgcontent(e.target.value)} value={msgcontent} type="text" placeholder="Aa" className="rounded-xl bg-gray-200 p-2 flex-1" />
                            {msgcontent && <button onClick={handleSendmsg} className="justify-end text-white bg-blue-500 font-semibold p-2 rounded-xl">Send</button>}
                        </div>
                    </div>

                }
            </div>
        </div>

    )
}

export default HomePage
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const sendMessages = async (req, res) => {
    const { content, img } = req.body;
    const senderId = req.user._id;
    const receiverId = req.params.id;

    try {
        console.log("message incoming in ")
        const receivinguser = await User.findById(receiverId)
        if (!receivinguser) {
            res.status(400).json({ message: "User not found" })
        }
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            content,
            img,
        })

        await newMessage.save()
        res.status(200).json({ message: "Message sent", newMessage })

    } catch (error) {
        res.status(400).json({ message: "Message couldnt be sent..." })
    }
}

export const getMessages = async(req, res) =>{
    const userid1 = req.params.id;
    const userid2 = req.user._id;

    try {
        const messages = await Message.find({
            $or:[
                {sender: userid1, receiver: userid2},
                {sender: userid2, receiver:userid1}
        ]
        }).sort({createdAt : 1})

        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json({message:"Error in retrieving messages"})
        
    }
}

export const deleteMessage = async(req, res)=>{
    const msgId = req.params.msgid;
    const userId = req.user;

    try {
        const message = await Message.findById(msgId)

        if(!message){
            res.status(400).json({message:"Message not found.."})
        }

        await Message.findByIdAndDelete(message.id)

        res.status(200).json({message: "Message deleted successfully"})


    } catch (error) {
        res.status(400).json({message:"Couldnt delete message.."})
    }


}
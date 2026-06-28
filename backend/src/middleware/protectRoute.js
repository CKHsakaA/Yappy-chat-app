import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const protectRoute = async(req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        console.log("message incoming at middleware")

        if(!token){
            res.status(400).json({message:"No authorized token. Login in first"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.userId).select("-password")

        if(!req.user){
            res.status(400).json({message:"User not found"})
        }
        next();
    } catch (error) {
        res.status(400).json({message:"Server error..."})
    }
}

export default protectRoute
import bcrypt from 'bcrypt'
import User from '../models/user.model.js';
import generateToken from '../lib/jwttoken.js';

export const signUp = async (req, res) => {
    const { fullName, email, password, username } = req.body;

    try {
        if (password.length < 6) {
            res.status(400).json({ message: "password should be more then 6 characters" })
        }

        const existingEmail = await User.findOne({ email })

        if (existingEmail) {
            res.status(400).json({ message: "Email already exists." })
        }

        const existingUsername = await User.findOne({ username })

        if (existingUsername) {
            res.status(400).json({ message: "Username already exists." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedpass,
            username
        })

        if (newUser) {
            await newUser.save()
            generateToken(newUser._id, res)

            res.status(201).json({
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            })
        } else {
            res.status(400).json({ message: "Invalid user info.." })
        }

    } catch (error) {
        res.status(400).json({ message: "server error.." })
    }
}

export const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!email || !password) {
            res.status(400).json({ message: "The above fields must be filled." })
        }

        if (password.length < 6) {
            res.status(400).json({ message: "password should be more then 6 characters" })
        }

        const userEmail = await User.findOne({ email })
        if (!userEmail) {
            res.status(400).json({ message: "Email doesnt exist" })
        }

        const comparepass = await bcrypt.compare(password, user.password)
        if (comparepass) {
            generateToken(user._id, res)
            res.status(200).json({ message: "logged in", user })
        } else {
            res.status(400).json({ message: "Incorrect email or password" })
        }

    } catch (error) {
        res.status(400).json({ message: "Server error.." })
    }
}

export const logOut = async (req, res) => {
    const user = req.user;
    try {
        if(user){
            res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV != 'development'
        })
        res.status(200).json({ message: "Logged out successsfully." })
        }
        else{
            res.status(400).json({message:"You need to login first"})
        }

    } catch (error) {
        res.status(400).json({ message: "Server error.." })
    }


}

export const updateProfile = async (req, res) => {
    const userId = req.user._id;
    const { fullName, profileImg, bio } = req.body;

    try {

        const user = await User.findById(userId)
        if (fullName) user.fullName = fullName;
        if (bio) user.bio = bio;
        if (profileImg) user.profileImg = profileImg;

        await user.save()

        res.status(200).json({ message: "Updated successfully", user })

    } catch (error) {
        res.status(400).json({ message: "Error in updating profile", error })
    }
}

export const changePass = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId)

    const { newPassword, oldPassword } = req.body;

    try {
        if (!newPassword || newPassword.length < 6) {
            res.status(400).json({ message: "Enter new password with greater thann 6 characters" })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password)

        if (!isMatch) {
            res.status(400).json({ message: "Incorrect old password.." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPass = await bcrypt.hash(newPassword, salt)

        user.password = hashedNewPass;
        await user.save()

        res.status(200).json({ message: "Password changed succesfully" })

    } catch (error) {
        res.status(400).json({ message: "Error in changing password.." })
    }
}

export const getMe = async (req, res) => {
    const user = req.user;

  try {
    res.status(200).json({user})
  } catch (err) {
    res.status(401).json({err});
  }
}

export const getAll= async(req,res)=>{
    const me = req.user;
    const users = await User.find({ _id: { $ne: me._id } }).select("-password")
    try {
        if(!users){
            res.status(400).json({message:"No users.."})
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({message:"Error at getting users..."})
    }
}

export const getYou = async(req, res)=>{
    const userid = req.params.otheruserid;
    const otheruser = await User.findById(userid).select("-password")

    try {
        if(!otheruser){
            res.status(400).json({message:"No user found"})
        }
        res.status(200).json(otheruser)
    } catch (error) {
        res.status(400).json({message:"Error at getting other user"})
    }
}
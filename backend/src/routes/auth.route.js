import express from 'express';
import { signUp, logIn, logOut, updateProfile, changePass, getMe, getAll, getYou} from '../controllers/auth.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/signup', signUp)
router.post('/login', logIn)
router.post('/logout',protectRoute, logOut)
router.post('/updateprofile', protectRoute, updateProfile)
router.post('/changepass', protectRoute, changePass)
router.get("/me",protectRoute, getMe);
router.get("/getallusers",protectRoute, getAll)
router.get("/getinfo/:otheruserid", getYou)


export default router
import express from 'express';
import { forgotPasswordController, loginController, registerController, testController } from '../controllers/authController.js';
import {isAdmin, requireSignIn} from '../middleware/authMiddleware.js'
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/forgotPassword", forgotPasswordController);

router.get("/test",requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req,res) => {
    return res.status(200).send({
        ok : true
    })  
})

router.get("/admin-auth", requireSignIn,isAdmin, (req,res) => {
    return res.status(200).send({
        ok : true
        
    })  
})
export default router;
import JWT from 'jsonwebtoken';
import User from '../models/userModel.js';

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

// adminAccess

export const isAdmin = async (req,res,next) => {
    try {
        const user = await User.findById(req.user._id);
        if(user.role !== 1) {
            return res.status(404).send({
                success : false,
                message : "unAthorized Access"
            })
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({
            success : false,
            error,
            message : "Error in Admin middleware"
        })
    }
}
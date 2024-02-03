import User from '../models/userModel.js';
import { comparePassword, hashPassword } from '../helper/authHelper.js';
import JWT from 'jsonwebtoken';
export const registerController = async(req,res) => {
    try {
        const {name, email, password, phone, question, address} = req.body;

        if(!name) {
           return res.send({message : "name is req!!"})
        }
        if(!email) {
            return res.send({message : "email is req!!"})
         }
         if(!password) {
            return res.send({message : "password is req!!"})
         }
         if(!phone) {
            return res.send({message : "phone is req!!"})
         }
         if(!question) {
            return res.send({message : "Question is req!!"})
         }
         if(!address) {
            return res.send({message : "address is req!!"})
         }

         const Existinguser = await User.findOne({email});
         if(Existinguser) {
            return res.status(200).send({
                success : false,
                message : "Already Register please login"
            })
         }

         const hashedPassword = await hashPassword(password);
         const user = await User.create({
            name,
            email,
            password : hashedPassword,
            phone,
            question,
            address
         })
         return res.status(201).send({
            success : true,
            message : "user register successfully",
            user
         })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error in Registration",
            error 
        })
    }

}

export const loginController = async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(404).send({
                success : false,
                message : "Invalid email or password"
            })
        }

        const userExist = await User.findOne({email});
        if(!userExist) {
            return res.status(404).send({
                success : false,
                message : "User not register"
            })
        }

        const match = await comparePassword(password, userExist.password);

        if(!match) {
            return res.status(401).send({
                success : false,
                message : "password is wrong"
            })
        }

        const token = JWT.sign({
            _id : userExist.id,
            name : userExist.name,
            email : userExist.email
        }, process.env.SECRET, {
            expiresIn : '8d'
        });

        return res.status(200).send({
            success : true,
            message : "User login Successfully",
            userExist:  {
                name : userExist.name,
                email : userExist.email,
                address : userExist.address,
                role : userExist.role,
                phone : userExist.phone
            },
            token
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error in Login",
            error
        })
    }
}

export const forgotPasswordController = async(req,res) => {
    try {
        const {email, question, newPassword} = req.body;
        if(!email) {
            return res.send({message : "email is req!!"})
         }
         if(!question) {
            return res.send({message : "question is required"})
         }
         if(!newPassword) {
            return res.send({message : "password is req!!"})
         }

         const user = await User.findOne({email, question});
         if(!user) {
            return res.status(404).send({
                success : false,
                message : "User Not Found"
            })
         }
         const hashedPassword = await hashPassword(newPassword);
         await User.findByIdAndUpdate(user._id, {
            password : hashedPassword
         })
         return res.status(200).send({
            success : true,
            message : "Password updated Successfully"
         });
    }
    catch(error) {
        console.log(error);
        return res.status(500).send({
            status : false,
            message : "Something Went Wrong",
            error
        })
    }
}

export const testController = async(req,res) => {
    return res.status(200).send({
        message : "protected route"
    })
}

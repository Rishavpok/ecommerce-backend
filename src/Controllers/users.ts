import express from "express";

var router = express.Router();
import User from "../Models/user-model";
import { UserService } from "../Services/user-service";
import {asyncHandler} from "../utlis/asyncHandler";

// register a new user

router.post('/register', asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, username, password, confirm_password } = req.body;
    const service = new UserService();

    const newUser = await service.register(username, password, confirm_password, firstName, lastName, email, phone);

    res.status(200).json({ message: "User registered successfully" });
}));

router.post('/login' , asyncHandler( async (req,res) => {
    const { username , password } = req.body
    const service = new UserService()

    const token = await  service.login(username, password)
    res.status(200).json({
            token : token
        })
} ) )

export default router

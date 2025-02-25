// Start Routes
import express from "express";
import User from "../model/User.js";
import bcrypt, { hash } from "bcrypt";
import crypto  from "crypto";
import jwt from "jsonwebtoken";
import { error } from "console";



const router = express.Router();

// Method for add user
router.post('/AddUser', async function (req, res) {
    console.log("request come from axios for adding user");
    try {
        const slateNumber = 10;
        const passwordHashed = await bcrypt.hash(req.body.password, slateNumber);
        const user = {
            email: req.body.email,
            password: passwordHashed
        }
        const NewUser = new User(user);

        // Generate A Token
        const scretKey =  crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({
            email: req.body.email
        }, scretKey, {expiresIn: "10min"});

        // Save Data To Database
        await NewUser.save();

        // Send Token To Client Side
        res.status(201).json(token);

        console.log("✅ Success Adding User")
    } catch (error) {
        res.status(500).send({message: "❌ Failed Adding User"});
        console.log("❌ Failed Adding User" + error);
    }
});


async function isThisPassword(password, hashPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

router.get("/GetUser/:password/:email", async (req, res) => {
    try {
        const users = await User.find();
        
        const check = false;
        for (let user of users) {
            const isPasswordValid = await isThisPassword(req.params.password, user.password);
            if (user.email === req.params.email && isPasswordValid) {
                console.log("User exists with correct password");
                return res.status(200).json({isExit: true});
            }
        }
        return res.status(200).json({isExit: false});
        
        console.log("❌ No user found with provided email and password");
    } catch (error) {
        res.status(500).send({ message: "❌ Failed Getting Users" });
        console.log("❌ Failed Getting Users" + error);
    }
});



export default router;

import { Router } from "express"    
import jwt from "jsonwebtoken"

const router  = Router()

const users = []

router.post("/login",(req,res)=>{
    const {username,email} = req.body
    if(!username || !email ){
        return res.status(404).json({message : "User and email required !"})
    }

    let user = users.find(u => u.email === email)

    if(!user) {
        user = { 
            username,
            email
        }
        users.push(user)
    }

    const token = jwt.sign(
        {username : user.username,email : user.email},
        process.env.JWT_SECRET || "secret123456",
        {expiresIn : '1d'}
    )

    console.log(users)
    res.status(200).end()
    res.cookie("token",token,{httpOnly : true})
})


export default router